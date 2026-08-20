/* ============================================
   AUTH.JS — Authentication & RBAC
   Roles: Admin, Analyst, Viewer
   Stackly AI Analytics
   ============================================ */

const AUTH_KEY = 'stackly_analytics_auth';
const USERS_DB_KEY = 'stackly_analytics_users';

function getUsers() {
  let users = JSON.parse(localStorage.getItem(USERS_DB_KEY));
  if (!users || users.length === 0) {
    users = [
      { id: 1, name: 'Admin User', email: 'admin@thestackly.com', password: 'Admin@123', role: 'admin', phone: '+91 67585 85497', createdAt: '2026-01-15' },
      { id: 2, name: 'Sarah Analyst', email: 'analyst@thestackly.com', password: 'Analyst@123', role: 'analyst', phone: '+91 98765 43210', createdAt: '2026-03-22' },
      { id: 3, name: 'John Viewer', email: 'viewer@thestackly.com', password: 'Viewer@123', role: 'viewer', phone: '+91 87654 32109', createdAt: '2026-05-10' },
    ];
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  }
  return users;
}

function saveUsers(users) {
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
}

function authLogin(email, password, role = 'viewer') {
  const users = getUsers();
  let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    user = { id: Date.now(), name: email.split('@')[0], email, password, role, phone: '', createdAt: new Date().toISOString().split('T')[0] };
    users.push(user);
    saveUsers(users);
  } else {
    user.role = role;
    saveUsers(users);
  }
  const session = { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone };
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  return { success: true, user: session };
}

function authSignup(name, email, password, phone, role = 'viewer') {
  const users = getUsers();
  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    role: role,
    phone: phone || '',
    createdAt: new Date().toISOString().split('T')[0],
  };
  users.push(newUser);
  saveUsers(users);
  const session = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, phone: newUser.phone };
  return { success: true, user: session };
}

function authLogout() {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = 'login.html';
}

function authIsLoggedIn() {
  return !!localStorage.getItem(AUTH_KEY);
}

function authGetUser() {
  const data = localStorage.getItem(AUTH_KEY);
  return data ? JSON.parse(data) : null;
}

function authIsAdmin() {
  const user = authGetUser();
  return user && user.role === 'admin';
}

function authIsAnalyst() {
  const user = authGetUser();
  return user && (user.role === 'analyst' || user.role === 'admin');
}

// RBAC: Protect backoffice routes
function authProtectRoute(requiredRole) {
  if (!authIsLoggedIn()) {
    window.location.href = 'login.html';
    return false;
  }
  if (requiredRole === 'admin' && !authIsAdmin()) {
    window.location.href = 'dashboard.html';
    return false;
  }
  if (requiredRole === 'analyst' && !authIsAnalyst()) {
    window.location.href = 'dashboard.html';
    return false;
  }
  return true;
}

// RBAC: Hide/show sidebar items based on role
function authApplyRBAC() {
  const user = authGetUser();
  if (!user) return;

  // Show/hide admin-only elements
  document.querySelectorAll('[data-role="admin-only"]').forEach(el => {
    el.style.display = user.role === 'admin' ? '' : 'none';
  });

  // Show/hide analyst+ elements
  document.querySelectorAll('[data-role="analyst-only"]').forEach(el => {
    el.style.display = (user.role === 'admin' || user.role === 'analyst') ? '' : 'none';
  });

  // Populate user info
  const setTextById = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setTextById('sb-name', user.name);
  setTextById('sb-role', user.role);
  setTextById('sb-email', user.email);
  setTextById('sb-avatar', user.name.charAt(0).toUpperCase());
  setTextById('topbarAvatar', user.name.charAt(0).toUpperCase());
  setTextById('topbar-name', user.name);
}

// Toast Notification
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${type === 'success' ? '<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>' :
      type === 'error' ? '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>' :
      '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>'}
    </svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = '0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

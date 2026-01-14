// Install prompt handling
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  // Show the install button
  document.getElementById('installBtn').hidden = false;
});

document.getElementById('installBtn').addEventListener('click', async () => {
  if (!deferredPrompt) return;
  
  // Show the install prompt
  deferredPrompt.prompt();
  
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;
  
  // Optionally, send analytics event with outcome of user choice
  console.log(`User response to the install prompt: ${outcome}`);
  
  // We no longer need the prompt
  deferredPrompt = null;
  // Hide the install button
  document.getElementById('installBtn').hidden = true;
});

// Optional: hide button if already installed
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
  document.getElementById('installBtn').hidden = true;
  deferredPrompt = null;
});
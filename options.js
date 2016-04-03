function save_options() {
	window.alert("HIHIHIHI")
  var enabled = document.getElementById('Enabled').value;
  chrome.storage.sync.set({
    memeSwapEnabled: enabled 
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

document.getElementById('save').addEventListener('click',
    save_options);
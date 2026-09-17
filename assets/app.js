// Shared helpers. Nothing here touches the network.

export function fmt(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

// Adds drag-and-drop to a <label> that already wraps the file <input>.
// onChange receives a FileList.
export function tray(el, input, onChange) {
  input.addEventListener('change', () => onChange(input.files));

  ['dragenter', 'dragover'].forEach((t) =>
    el.addEventListener(t, (e) => { e.preventDefault(); el.classList.add('hot'); })
  );
  ['dragleave', 'drop'].forEach((t) =>
    el.addEventListener(t, (e) => { e.preventDefault(); el.classList.remove('hot'); })
  );
  el.addEventListener('drop', (e) => onChange(e.dataTransfer.files));
}

// Renders the picked files. opts: { numbered, onRemove, onMoveUp }
export function list(ul, files, opts) {
  ul.innerHTML = '';
  files.forEach((f, i) => {
    const li = document.createElement('li');
    if (opts.numbered) {
      const ord = document.createElement('span');
      ord.className = 'ord';
      ord.textContent = i + 1;
      li.append(ord);
    }
    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = f.name;
    const size = document.createElement('span');
    size.className = 'size';
    size.textContent = fmt(f.size);
    li.append(name, size);

    if (opts.onMoveUp && i > 0) {
      const up = document.createElement('button');
      up.type = 'button';
      up.textContent = 'Move up';
      up.setAttribute('aria-label', 'Move ' + f.name + ' earlier');
      up.addEventListener('click', () => opts.onMoveUp(i));
      li.append(up);
    }

    const rm = document.createElement('button');
    rm.type = 'button';
    rm.textContent = 'Remove';
    rm.setAttribute('aria-label', 'Remove ' + f.name);
    rm.addEventListener('click', () => opts.onRemove(i));
    li.append(rm);
    ul.append(li);
  });
}

// Shows a download link for a finished Blob.
export function result(box, blob, filename, note) {
  const url = URL.createObjectURL(blob);
  box.innerHTML = '';
  const p = document.createElement('p');
  p.textContent = note;
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.textContent = 'Save ' + filename;
  box.append(p, a);
  box.hidden = false;
}

export function fail(box, message) {
  box.textContent = message;
  box.hidden = false;
}

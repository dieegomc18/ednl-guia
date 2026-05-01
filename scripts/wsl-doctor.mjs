import {realpathSync} from 'node:fs';

function isSlowMount(cwd) {
  // In WSL, /mnt/c is typically a 9p mount and is much slower for node_modules.
  return cwd.startsWith('/mnt/');
}

const cwd = realpathSync(process.cwd());

if (isSlowMount(cwd)) {
  console.warn('⚠️  EDNL doctor: estás ejecutando desde un path bajo /mnt (Windows mount).');
  console.warn('    Esto suele ser MUCHO más lento para Node (npm ci/build/start).');
  console.warn('');
  console.warn('    Recomendación: clona y trabaja dentro del filesystem de WSL (ext4), por ejemplo:');
  console.warn('      mkdir -p ~/code && cd ~/code');
  console.warn('      git clone https://github.com/dieegomc18/ednl-guia.git');
  console.warn('      cd ednl-guia');
  console.warn('      npm ci');
  console.warn('      npm run start');
  console.warn('');
  process.exitCode = 0;
} else {
  console.log('OK: no estás en /mnt/* (rendimiento local debería ser razonable).');
}

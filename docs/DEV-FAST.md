# DEV-FAST (WSL)

Si vas a estudiar y necesitas que todo vaya rápido (npm install, build, start), **no trabajes desde**:

- `/mnt/c/...` (Windows mount)

En WSL suele ser un filesystem tipo **9p** y hace que `npm ci` y `npm run build` sean MUCHO más lentos.

## Flujo recomendado

```bash
mkdir -p ~/code
cd ~/code
git clone https://github.com/dieegomc18/ednl-guia.git
cd ednl-guia

npm ci
npm run doctor
npm run start
```

## Comandos útiles

- `npm run check:guia`  (verifica que `docs/guia-completa.md` está sincronizada)
- `npm run build`       (build producción)
- `npm run smoke`       (checks de artefactos mínimos)

## Si algo va lento

1) Ejecuta `npm run doctor`
2) Si estás en `/mnt/*`, mueve el repo a `~/code/...`

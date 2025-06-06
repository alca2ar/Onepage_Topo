# Onepage - Dashboard Topo

Dashboard de una página con React (frontend) y FastAPI (backend).

## Consideraciones Importantes

1. **Organización del contenido**: Todos los contenidos del repositorio deben guardarse en una misma carpeta
2. **Uso de dos terminales**: Una para el backend y otra para el frontend
3. **Incluir dependencias**: En la aplicación React (carpeta frontend) debe incluirse la carpeta `node_modules`

## Estructura del Proyecto
proyecto/
├── backend/
│   └── main.py
└── frontend/
    ├── src/
    ├── node_modules/
    └── package.json

## Instalación

**Frontend - Instalar dependencias:**
```bash
cd ruta/a/tu/proyecto/frontend
npm install
```


## Ejecución
### Terminal 1 - Backend (API Uvicorn)
El backend usa la API de Uvicorn, activarlo con:

```bash
cd ruta\a\tu\proyecto\backend
python -m uvicorn main:app --reload
```

### Terminal 2 - Frontend (React)
Usando React, en la otra terminal navegar a:

```bash
cd ruta\a\tu\proyecto\frontend
npm start
```

## URLs de Acceso

Frontend: http://localhost:3000
Backend: http://localhost:8000
API Docs: http://localhost:8000/docs

import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Crea la aplicación FastAPI
app = FastAPI()

# --- IMPORTANTE: Configuración de CORS ---
# React correrá en un puerto diferente (ej: 3000) y el backend en otro (ej: 8000).
# El navegador bloquearía las peticiones por seguridad. CORS permite la comunicación.
origins = [
    "http://localhost:3000", # La URL donde correrá tu app de React
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Definición de los Endpoints de la API ---

@app.get("/")
def read_root():
    return {"status": "API del Dashboard funcionando!"}

# --- Endpoints para datos de POSO ---
@app.get("/api/poso/volatilidad")
def get_volatilidad():
    df = pd.read_csv('data/poso/volatilidad_PRECIO_POR_LT.csv')
    df.dropna(inplace=True)
    return df.to_dict(orient='records')

@app.get("/api/poso/predicciones-co2")
def get_predicciones_co2():
    df = pd.read_csv('data/poso/predicciones_CO2_XgBoost.csv')
    return df.to_dict(orient='records')

@app.get("/api/poso/matriz-precio")
def get_matriz_precio():
    df = pd.read_csv('data/poso/matriz_transiciones_precio_lts.csv')
    return df.to_dict(orient='records')


@app.get("/api/poso/matriz-costo")
def get_matriz_costo():
    df = pd.read_csv('data/poso/matriz_transiciones_costo_km.csv')
    return df.to_dict(orient='records')

@app.get("/api/poso/estadisticas")
def get_estadisticas():
    df = pd.read_csv('data/poso/estadisticas_simulaciones.csv')
    return df.to_dict(orient='records')

# --- Endpoints para datos de TAGS ---
@app.get("/api/tags/cluster-summary")
def get_cluster_summary():
    df = pd.read_csv('data/tags/cluster_summary.csv')
    return df.to_dict(orient='records')

@app.get("/api/tags/recommendations")
def get_recommendations():
    df = pd.read_csv('data/tags/recommendations.csv')
    return df.to_dict(orient='records')

@app.get("/api/tags/numerical-comparison")
def get_numerical_comparison():
    df = pd.read_csv('data/tags/numerical_comparison.csv')
    return df.to_dict(orient='records')
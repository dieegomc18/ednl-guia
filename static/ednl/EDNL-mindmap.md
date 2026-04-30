# EDNL (Estructuras de Datos No Lineales)

## Árboles

### Definición y componentes

#### Raíz, padre, hijo, hermanos

#### Nivel, altura, profundidad

#### Grado y hojas

### Árbol binario (TAD Abin)

#### Especificación del TAD

#### Representación enlazada

#### Representación vectorial

#### Vector de posiciones relativas

#### Recorridos (patrones)

##### Preorden, Inorden, Postorden

##### Recorrido por niveles

### Árbol general (TAD Agen)

#### Especificación del TAD

#### Lista de hijos (vectorial)

#### Celdas enlazadas

### ABB (Árbol Binario de Búsqueda)

#### Invariante de orden

#### Búsqueda, inserción, eliminación

#### Ínfimo y supremo

### Árboles de búsqueda equilibrados

#### AVL

##### Factor de equilibrio

##### Rotaciones

#### ARN (rojo-negro)

##### Propiedades

##### Reequilibrado

#### AVL vs ARN

### Árboles parcialmente ordenados (APO / montículos)

#### Operaciones básicas

##### Insertar, borrar mínimo/máximo

##### Flotar y hundir

#### Implementación

##### APO mínimo

##### APO máximo

### Problemas tipo examen (árboles)

#### Reflejar árbol binario

#### Reflejar árbol general

#### Árboles generales similares

#### Contar nodos verdes

#### Flotar / hundir nodos

#### Comprobar si es AVL

#### Agenda ABB

#### Múltiplos de 3 en árbol general

#### Densidad de un árbol general

## Tablas de dispersión (Hash)

### Funciones hash

#### Dominio, rango y uniformidad

### Colisiones

#### Hashing cerrado

#### Hashing abierto

#### Encadenamiento mezclado

### Eficiencia

#### Factor de carga

#### Comparación entre métodos

### Redimensionamiento

#### Rehashing

### Hash vs árboles de búsqueda

## Grafos

### Definición y tipos

#### Dirigidos vs no dirigidos

#### Ponderados vs no ponderados

### Representaciones

#### Matriz de adyacencia

#### Lista de adyacencia

### Recorridos

#### BFS

#### DFS

### Caminos de coste mínimo

#### Dijkstra (pesos no negativos)

#### Floyd (todos los pares)

#### Warshall (clausura transitiva)

### Árboles generadores de coste mínimo

#### TAD Partición (Union-Find)

#### Kruskal

#### Prim

### Problemas tipo examen (grafos)

#### Ciudades Rebeldes

#### Puentes Grecoland

#### Toxicidad Zuelandia

#### Líneas Aéreas Tumbuctú

#### Repartidor de Bebidas

#### Laberinto 3D

#### Matriz Fauno

#### Viajes Alergias

#### Viajes Tren, Bus y Avión

## Plantillas de implementación (C++)

### Árboles

#### Recursión estructural sobre Abin/Agen

#### Casos base (NODO_NULO)

#### Complejidad y altura

### Grafos

#### Modelado del problema

#### Estructuras auxiliares (dist, pred, visit)

#### Elección de algoritmo

## Estrategia de examen

### Identificar el TAD y el recorrido

### Definir invariantes y casos borde

### Justificar complejidad

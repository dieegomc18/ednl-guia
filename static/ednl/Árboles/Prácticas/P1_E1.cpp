//1. Implementa un subprograma que calcule el número de nodos de un árbol binario, sin usar la operación tama() del TAD Abin.

#include <cstddef>
#include "Abin_vec0.h"
#include <iostream>

template <typename T>
std::size_t numNodosRec(typename Abin<T>::nodo n, const Abin<T>& A)
{
    if (n == Abin<T>::NODO_NULO)  // subárbol vacío
        return 0;

    return 1
         + numNodosRec(A.hijoIzqdo(n), A)
         + numNodosRec(A.hijoDrcho(n), A);
}

template <typename T>
std::size_t numNodos(const Abin<T>& A)
{
    return numNodosRec(A.raiz(), A);
}

int main()
{
    Abin<int> A(15); // Árbol con 15 nodos y -1 como nodo nulo.
    A.insertarRaiz(1);
    A.insertarHijoIzqdo(A.raiz(), 2);
    A.insertarHijoDrcho(A.raiz(), 3);
    A.insertarHijoIzqdo(A.hijoIzqdo(A.raiz()), 4);
    A.insertarHijoDrcho(A.hijoIzqdo(A.raiz()), 5);
    A.insertarHijoIzqdo(A.hijoDrcho(A.raiz()), 6);
    A.insertarHijoDrcho(A.hijoDrcho(A.raiz()), 7);

    std::cout << "Número de nodos: " << numNodos(A) << std::endl;

    return 0;
}

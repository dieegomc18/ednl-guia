//3. Implementa un subprograma que, dados un árbol binario y un nodo del mismo, determine la profundidad de este nodo en dicho árbol.

#include <cstddef>
#include "Abin_vec1.h"
#include <iostream>

template <typename T>
std::size_t profundidad(typename Abin<T>::nodo n, const Abin<T>& A)
{
    std::size_t prof = 0;
    while (n != A.NODO_NULO) {
        n = A.padre(n);
        ++prof;
    }
    return prof;
}

template <typename T>
void imprimirArbol(typename Abin<T>::nodo n, const Abin<T>& A, int nivel)
{
    if (n != Abin<T>::NODO_NULO) {
        imprimirArbol(A.hijoDrcho(n), A, nivel + 1);
        std::cout << std::string(4 * nivel, ' ') << A.elemento(n) << std::endl;
        imprimirArbol(A.hijoIzqdo(n), A, nivel + 1);
    }
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
    imprimirArbol(A.raiz(), A, 0);

    std::cout << "Profundidad del nodo 5: " << profundidad(A.hijoDrcho(A.hijoIzqdo(A.raiz())), A) << std::endl;

    return 0;
}

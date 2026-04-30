//2. Implementa un subprograma que calcule la altura de un árbol binario.

#include <cstddef>
#include "Abin_vec1.h"
#include <iostream>

template <typename T>
std::size_t AlturaRec(typename Abin<T>::nodo n, const Abin<T>& A)
{
    if (n == Abin<T>::NODO_NULO)  // subárbol vacío
        return 0;

    return 1 + std::max(AlturaRec(A.hijoIzqdo(n), A), AlturaRec(A.hijoDrcho(n), A));
}

template <typename T>
std::size_t altura(const Abin<T>& A)
{
    return AlturaRec(A.raiz(), A);
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
    A.insertarHijoDrcho(A.hijoDrcho(A.hijoDrcho(A.raiz())), 8);
    

    imprimirArbol(A.raiz(), A, 0);

    std::cout << "Altura del árbol: " << altura(A) << std::endl;

    return 0;
}



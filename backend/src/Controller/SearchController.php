<?php

namespace App\Controller;

use App\Entity\Produit;
use App\Repository\ProduitRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
final class SearchController extends AbstractController
{
    #[Route('/search', name: 'search', methods: ['GET'])]
    public function globalSearch(Request $request, ProduitRepository $produitRepository): JsonResponse
    {
        $query = trim($request->query->get('q', ''));

        if (strlen($query) < 2) {
            return $this->json([
                'results' => [],
                'message' => 'Veuillez entrer au moins 2 caractères'
            ]);
        }
        
        // Recherche dans différentes entités
        $results = [
            'products' => $produitRepository->search($query, 5),
            // Ajoutez d'autres catégories
        ];
        
        // Compte total des résultats
        $total = array_sum(array_map('count', $results));
        
        return $this->json([
            'results' => $results,
            'total' => $total,
            'query' => $query
        ]);
    }
}

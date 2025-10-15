<?php

namespace App\Controller;

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
                'results' => [
                    'products' => []
                ],
                'message' => 'Veuillez entrer au moins 2 caractères',
                'total' => 0,
                'query' => $query
            ]);
        }
        
        $products = $produitRepository->search($query, 5);
        
        // Sérialisation manuelle pour éviter les références circulaires
        $productsData = [];
        foreach ($products as $product) {
            $productsData[] = [
                'id' => $product->getId(),
                'nom' => $product->getNom(),
                'description' => $product->getDescription(),
                'image' => $product->getImage(),
                'fiche_technique' => $product->getFicheTechnique()
            ];
        }
        
        return $this->json([
            'results' => [
                'products' => $productsData
            ],
            'total' => count($productsData),
            'query' => $query
        ]);
    }
}
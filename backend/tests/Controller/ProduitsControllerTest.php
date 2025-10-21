<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ProduitsControllerTest extends WebTestCase
{
    /**
     * Test de récupération de la liste des produits via GET /api/produits
     */
    public function testGetProduitsList(): void
    {
        // Arrange - Créer un client HTTP pour simuler les requêtes
        $client = static::createClient();
        
        // Act - Effectuer une requête GET sur l'endpoint /api/produits
        $client->request('GET', '/api/produits');
        
        // Assert - Vérifier la réponse
        
        // 1. Vérifier le code de statut HTTP (200 = OK)
        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(200);
        
        // 2. Vérifier que la réponse est au format JSON
        $this->assertResponseHeaderSame('Content-Type', 'application/json');
        
        // 3. Récupérer et décoder le contenu JSON
        $responseContent = $client->getResponse()->getContent();
        $data = json_decode($responseContent, true);
        
        // 4. Vérifier que c'est un tableau
        $this->assertIsArray($data);
        
        // 5. Si des produits existent, vérifier la structure
        if (count($data) > 0) {
            $premierProduit = $data[0];
            
            // Vérifier que les clés essentielles existent
            $this->assertArrayHasKey('id', $premierProduit);
            $this->assertArrayHasKey('nom', $premierProduit);
            $this->assertArrayHasKey('description', $premierProduit);
            $this->assertArrayHasKey('image', $premierProduit);
            $this->assertArrayHasKey('fiche_technique', $premierProduit);
            
            // Vérifier les types de données
            $this->assertIsInt($premierProduit['id']);
            $this->assertIsString($premierProduit['nom']);
            $this->assertIsString($premierProduit['description']);
        }
    }
    
    /**
     * Test de récupération d'un produit spécifique par ID
     */
    public function testGetSingleProduit(): void
    {
        // Arrange
        $client = static::createClient();
        
        // D'abord, récupérer la liste pour obtenir un ID valide
        $client->request('GET', '/api/produits');
        $produits = json_decode($client->getResponse()->getContent(), true);
        
        // Si la base est vide, on skip le test
        if (empty($produits)) {
            $this->markTestSkipped('Aucun produit dans la base de données pour tester.');
        }
        
        $produitId = $produits[0]['id'];
        
        // Act - Récupérer un produit spécifique
        $client->request('GET', '/api/produits/' . $produitId);
        
        // Assert
        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(200);
        
        $produit = json_decode($client->getResponse()->getContent(), true);
        
        $this->assertEquals($produitId, $produit['id']);
        $this->assertNotEmpty($produit['nom']);
    }
    
    /**
     * Test que l'endpoint retourne 404 pour un produit inexistant
     */
    public function testGetNonExistentProduitReturns404(): void
    {
        // Arrange
        $client = static::createClient();
        $idInexistant = 99999;
        
        // Act
        $client->request('GET', '/api/produits/' . $idInexistant);
        
        // Assert
        $this->assertResponseStatusCodeSame(404);
    }
}
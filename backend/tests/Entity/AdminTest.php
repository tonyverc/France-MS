<?php

namespace App\Tests\Entity;

use App\Entity\Admin;
use PHPUnit\Framework\TestCase;

class AdminTest extends TestCase
{
    /**
     * Test de la création d'une entité Admin et des getters/setters basiques
     */
    public function testAdminCreation(): void
    {
        // Arrange (Préparation)
        $admin = new Admin();
        
        // Act (Action)
        $admin->setNom('Jean Dupont');
        $admin->setEmail('jean.dupont@example.com');
        $admin->setPassword('hashed_password_123');
        
        // Assert (Vérification)
        $this->assertEquals('Jean Dupont', $admin->getNom());
        $this->assertEquals('jean.dupont@example.com', $admin->getEmail());
        $this->assertEquals('hashed_password_123', $admin->getPassword());
    }
    
    /**
     * Test de la validation de l'email (doit être valide)
     */
    public function testEmailValidation(): void
    {
        // Arrange
        $admin = new Admin();
        $validEmail = 'admin@francemarineservices.com';
        
        // Act
        $admin->setEmail($validEmail);
        
        // Assert
        $this->assertEquals($validEmail, $admin->getEmail());
        $this->assertNotEmpty($admin->getEmail());
        $this->assertStringContainsString('@', $admin->getEmail());
    }
    
    /**
     * Test que getUserIdentifier() retourne bien l'email
     */
    public function testUserIdentifierReturnsEmail(): void
    {
        // Arrange
        $admin = new Admin();
        $email = 'test@example.com';
        
        // Act
        $admin->setEmail($email);
        
        // Assert
        $this->assertEquals($email, $admin->getUserIdentifier());
    }
    
    /**
     * Test que getRoles() retourne toujours ROLE_ADMIN
     */
    public function testGetRolesReturnsAdminRole(): void
    {
        // Arrange
        $admin = new Admin();
        
        // Act
        $roles = $admin->getRoles();
        
        // Assert
        $this->assertIsArray($roles);
        $this->assertCount(1, $roles);
        $this->assertContains('ROLE_ADMIN', $roles);
    }
    
    /**
     * Test que les collections sont initialisées correctement
     */
    public function testCollectionsAreInitialized(): void
    {
        // Arrange & Act
        $admin = new Admin();
        
        // Assert
        $this->assertCount(0, $admin->getProduit());
        $this->assertCount(0, $admin->getMessage());
    }
}
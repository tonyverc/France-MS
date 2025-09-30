<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250930120431 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE message ADD admi_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F9D44C234 FOREIGN KEY (admi_id) REFERENCES `admin` (id)');
        $this->addSql('CREATE INDEX IDX_B6BD307F9D44C234 ON message (admi_id)');
        $this->addSql('ALTER TABLE produit ADD admi_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE produit ADD CONSTRAINT FK_29A5EC279D44C234 FOREIGN KEY (admi_id) REFERENCES `admin` (id)');
        $this->addSql('CREATE INDEX IDX_29A5EC279D44C234 ON produit (admi_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE produit DROP FOREIGN KEY FK_29A5EC279D44C234');
        $this->addSql('DROP INDEX IDX_29A5EC279D44C234 ON produit');
        $this->addSql('ALTER TABLE produit DROP admi_id');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F9D44C234');
        $this->addSql('DROP INDEX IDX_B6BD307F9D44C234 ON message');
        $this->addSql('ALTER TABLE message DROP admi_id');
    }
}

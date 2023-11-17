<?php

namespace App\Controller\Admin;

use getID3;
use App\Entity\Song;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class SongCrudController extends AbstractCrudController
{
    public const SONG_BASE_PATH = 'upload/files/music';
    public const SONG_UPLOAD_DIR = 'public/upload/files/music';


    public static function getEntityFqcn(): string
    {
        return Song::class;
    }

    
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('title', 'Titre de la chanson'),
            ImageField::new('file_path', 'Choisir MP3')
            ->setBasePath(self::SONG_BASE_PATH)
            ->setUploadDir(self::SONG_UPLOAD_DIR)
            ->setUploadedFileNamePattern(
                fn(UploadedFile $file): string => sprintf(
                    'upload_%s_%s.%s',
                    uniqid(),
                    $file->getFilename(),
                    $file->guessExtension()
                )
            )
            ->hideOnIndex()
            ->hideOnDetail(),
            TextField::new('file_path', 'Aperçu')
            ->hideOnForm()
            ->formatValue(function($value, $entity){
                return '<audio controls>
                    <source src="/upload/files/music/'.$value.'" type="audio/mpeg">
                </audio>';
            }),
            NumberField::new('duration', 'Durée de la chanson')->hideOnForm(),
            AssociationField::new('album', 'Album associé'),

            
        ];
    }
    

    public function configureCrud(Crud $crud): Crud
    {
        //permet de renommer les différentes pages
        return $crud
            ->setPageTitle(Crud::PAGE_INDEX, 'Liste des chansons')
            ->setPageTitle(Crud::PAGE_NEW, 'Ajouter une chanson')
            ->setPageTitle(Crud::PAGE_EDIT, 'Modifier une chanson')
            ->setPageTitle(Crud::PAGE_DETAIL, 'Détail de la chanson');
    }

    //fonction pour agir sur les boutons d'actions
    public function configureActions(Actions $actions): Actions
    {
        return $actions
            //on redéfinit les boutons d'actions de la page index
            ->update(
                Crud::PAGE_INDEX,
                Action::NEW,
                fn (Action $action) => $action
                    ->setIcon('fa fa-plus')
                    ->setLabel('Ajouter')
                    ->setCssClass('btn btn-success')
            )
            ->update(
                Crud::PAGE_INDEX,
                Action::EDIT,
                fn (Action $action) => $action
                    ->setIcon('fa fa-pen')
                    ->setLabel('Modifier')
            )
            ->update(
                Crud::PAGE_INDEX,
                Action::DELETE,
                fn (Action $action) => $action
                    ->setIcon('fa fa-trash')
                    ->setLabel('Supprimer')
            )
            //on redéfinit les boutons d'actions de la page edit
            ->update(
                Crud::PAGE_EDIT,
                Action::SAVE_AND_RETURN,
                fn (Action $action) => $action
                    ->setLabel('Enregistrer et quitter')
            )
            ->update(
                Crud::PAGE_EDIT,
                Action::SAVE_AND_CONTINUE,
                fn (Action $action) => $action
                    ->setLabel('Enregistrer et continuer')
            )
            //on redéfinit les boutons d'actions de la page new
            ->update(
                Crud::PAGE_NEW,
                Action::SAVE_AND_RETURN,
                fn (Action $action) => $action
                    ->setLabel('Enregistrer et quitter')
            )
            ->update(
                Crud::PAGE_NEW,
                Action::SAVE_AND_ADD_ANOTHER,
                fn (Action $action) => $action
                    ->setLabel('Enregistrer et ajouter un nouveau')
            )
            ->add(Crud::PAGE_INDEX, Action::DETAIL)
            ->update(
                Crud::PAGE_INDEX,
                Action::DETAIL,
                fn (Action $action) => $action
                    ->setIcon('fa fa-eye')
                    ->setLabel('Voir')
            )
            ->update(
                Crud::PAGE_DETAIL,
                Action::EDIT,
                fn (Action $action) => $action
                    ->setIcon('fa fa-pen')
                    ->setLabel('Modifier')
            )
            ->update(
                Crud::PAGE_DETAIL,
                Action::DELETE,
                fn (Action $action) => $action
                    ->setIcon('fa fa-trash')
                    ->setLabel('Supprimer')
            )
            ->update(
                Crud::PAGE_DETAIL,
                Action::INDEX,
                fn (Action $action) => $action
                    ->setIcon('fa fa-list')
                    ->setLabel('Retour à la liste')
            );
    }

    public function getDurationFile($file)
    {
        $getID3 = new getID3;
       //on récupère le chemin du fichier
       $basePath = $this->getParameter('kernel.project_dir').'/public/upload/files/music/';
       //on récupère le fichier
       $file = new File($basePath.$file);
       $duration = $getID3->analyze($file)['playtime_seconds'] ?? 0;
       return $duration;
    }

    //on persist les données pour la durée du titre
    public function persistEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        if(!$entityInstance instanceof Song) return;
        $file = $entityInstance->getFilePath();
        $entityInstance->setDuration($this->getDurationFile($file));
        parent::persistEntity($entityManager, $entityInstance);
    }

    //on update les données pour la durée du titre
    public function updateEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        if(!$entityInstance instanceof Song) return;
        $file = $entityInstance->getFilePath();
        $entityInstance->setDuration($this->getDurationFile($file));
        parent::updateEntity($entityManager, $entityInstance);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;


class TipoPrestazioneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('performance_type')->insert(array(
            array(
                'performance_type_id' => Str::uuid(),
                'type' => 'M',
                'title' => 'Riabilitazione dell\'arto fantasma',
                'description' => 'Questa tecnica mira a ridurre o eliminare il dolore dell\'arto fantasma, una condizione in cui il paziente percepisce sensazioni (spesso dolorose) nell\'arto amputato. Le strategie includono la mirror therapy (terapia con specchio), esercizi mentali di visualizzazione, stimolazione sensoriale del moncone e tecniche di rilassamento.',
                'change_time' => $now,
                'active_record' => 1,
            ),
            array(
                'performance_type_id' => Str::uuid(),
                'type' => 'M',
                'title' => 'Training alla deambulazione con protesi (Gait Training Protesico)',
                'description' => 'Questa tecnica si concentra sull\'addestramento del paziente all\'uso corretto della protesi per camminare in modo efficiente e sicuro. Include esercizi di equilibrio, coordinazione, rinforzo muscolare, e progressioni su superfici diverse.',
                'change_time' => $now,
                'active_record' => 1,
            ),
            array(
                'performance_type_id' => Str::uuid(),
                'type' => 'M',
                'title' => 'Rieducazione Propriocettiva',
                'description' => 'La rieducazione propriocettiva è una prestazione sanitaria fondamentale per i pazienti amputati, mirata a migliorare il senso del corpo nello spazio, fondamentale per il recupero del movimento e dell\'equilibrio. Poiché la perdita di un arto può alterare drasticamente la percezione del corpo, questo tipo di terapia si concentra sul miglioramento della consapevolezza corporea, sia del moncone che delle altre parti del corpo.',
                'change_time' => $now,
                'active_record' => 1,
            ),
            array(
                'performance_type_id' => Str::uuid(),
                'type' => 'M',
                'title' => 'Rieducazione alla deambulazione con protesi',
                'description' => 'Questa prestazione si concentra sull\'insegnamento e il perfezionamento della camminata con l\'ausilio di una protesi. Il percorso riabilitativo include esercizi di equilibrio, postura, coordinazione e rinforzo muscolare, con l\'obiettivo di restituire al paziente un\'andatura sicura, efficiente e il più possibile naturale. Il programma è personalizzato in base al tipo di amputazione e alla protesi utilizzata, ed è supportato da figure specializzate come fisioterapisti, tecnici ortopedici e medici fisiatri.',
                'change_time' => $now,
                'active_record' => 1,
            ),
            array(
                'performance_type_id' => Str::uuid(),
                'type' => 'M',
                'title' => 'Stimolazione elettrica neuromuscolare (NMES)',
                'description' => 'La NMES è una tecnica terapeutica che utilizza impulsi elettrici per stimolare i nervi motori e attivare la contrazione muscolare. Viene impiegata per prevenire l\'atrofia muscolare in pazienti con mobilità ridotta, migliorare la forza nei muscoli indeboliti, e facilitare la riabilitazione neuromotoria. Il trattamento è spesso integrato in programmi di recupero post-ictus, lesioni del midollo spinale o in seguito a interventi ortopedici.',
                'change_time' => $now,
                'active_record' => 1,
            ),
            array(
                'performance_type_id' => Str::uuid(),
                'type' => 'M',
                'title' => 'Rieducazione Propriocettiva',
                'description' => 'La rieducazione propriocettiva è una prestazione sanitaria fondamentale per i pazienti amputati, mirata a migliorare il senso del corpo nello spazio, fondamentale per il recupero del movimento e dell\'equilibrio. Poiché la perdita di un arto può alterare drasticamente la percezione del corpo, questo tipo di terapia si concentra sul miglioramento della consapevolezza corporea, sia del moncone che delle altre parti del corpo.',
                'change_time' => $now,
                'active_record' => 1,
            ),
            array(
                'performance_type_id' => Str::uuid(),
                'type' => 'M',
                'title' => 'Educazione e gestione del moncone (Prevenzione e Cura del Moncone)',
                'description' => 'Questa prestazione si focalizza sull\'educazione del paziente alla corretta gestione quotidiana del moncone per prevenire infezioni, irritazioni cutanee e complicanze post-protesiche. Include tecniche di igiene, bendaggio, controllo del gonfiore, prevenzione delle piaghe da decubito e uso corretto del liner protesico. Può prevedere il coinvolgimento del caregiver e l\'addestramento all\'auto-monitoraggio.',
                'change_time' => $now,
                'active_record' => 1,
            ),
            array(
                'performance_type_id' => Str::uuid(),
                'type' => 'M',
                'title' => 'Terapia Manuale',
                'description' => 'Si tratta di una terapia per aiutare il paziente a migliorare la condizione della sua mobilità.',
                'change_time' => $now,
                'active_record' => 1,
            ),
            array(
                'performance_type_id' => Str::uuid(),
                'type' => 'P',
                'title' => 'Terapia dell\'Immagine Corporea (Body Image Therapy)',
                'description' => 'Lavora sul modo in cui il paziente percepisce il proprio corpo dopo l\'amputazione. Include esercizi di visualizzazione, uso di specchi, tecniche artistiche o dialogo guidato per affrontare l\'alterazione dello schema corporeo.',
                'change_time' => $now,
                'active_record' => 1,
            ),
            array(
                'performance_type_id' => Str::uuid(),
                'type' => 'P',
                'title' => 'Terapia Cognitivo-Comportamentale (CBT)',
                'description' => 'Lavora sul modo in cui il paziente percepisce il proprio corpo dopo l\'amputazione. Include esercizi di visualizzazione, uso di specchi, tecniche artistiche o dialogo guidato per affrontare l\'alterazione dello schema corporeo.',
                'change_time' => $now,
                'active_record' => 1,
            ),
            array(
                'performance_type_id' => Str::uuid(),
                'type' => 'P',
                'title' => 'Supporto psicologico post-amputazione',
                'description' => 'Percorso di sostegno psicologico rivolto a persone che hanno subito un\'amputazione. L\'intervento mira ad aiutare il paziente ad affrontare il lutto per la perdita dell’arto, elaborare le emozioni legate al trauma (come rabbia, ansia, depressione), sviluppare strategie di adattamento, rafforzare l\'autostima e promuovere l\'accettazione della nuova immagine corporea. Il supporto può includere colloqui individuali, tecniche di rilassamento e training di resilienza.',
                'change_time' => $now,
                'active_record' => 1,
            ),
        ));
    }
}

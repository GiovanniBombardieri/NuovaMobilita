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

        DB::table('tipo_prestazione')->insert(array(
            array(
                'id_tipo_prestazione' => Str::uuid(),
                'tipologia' => 'M',
                'titolo' => 'Riabilitazione dell\'arto fantasma',
                'descrizione' => 'Questa tecnica mira a ridurre o eliminare il dolore dell\'arto fantasma, una condizione in cui il paziente percepisce sensazioni (spesso dolorose) nell\'arto amputato. Le strategie includono la mirror therapy (terapia con specchio), esercizi mentali di visualizzazione, stimolazione sensoriale del moncone e tecniche di rilassamento.',
                'time_modifica' => $now,
                'record_attivo' => 1,
            ),
            array(
                'id_tipo_prestazione' => Str::uuid(),
                'tipologia' => 'M',
                'titolo' => 'Training alla deambulazione con protesi (Gait Training Protesico)',
                'descrizione' => 'Questa tecnica si concentra sull\'addestramento del paziente all\'uso corretto della protesi per camminare in modo efficiente e sicuro. Include esercizi di equilibrio, coordinazione, rinforzo muscolare, e progressioni su superfici diverse.',
                'time_modifica' => $now,
                'record_attivo' => 1,
            ),
            array(
                'id_tipo_prestazione' => Str::uuid(),
                'tipologia' => 'P',
                'titolo' => 'Terapia dell\'Immagine Corporea (Body Image Therapy)',
                'descrizione' => 'Lavora sul modo in cui il paziente percepisce il proprio corpo dopo l\'amputazione. Include esercizi di visualizzazione, uso di specchi, tecniche artistiche o dialogo guidato per affrontare l\'alterazione dello schema corporeo.',
                'time_modifica' => $now,
                'record_attivo' => 1,
            ),
            array(
                'id_tipo_prestazione' => Str::uuid(),
                'tipologia' => 'P',
                'titolo' => 'Terapia Cognitivo-Comportamentale (CBT)',
                'descrizione' => 'Lavora sul modo in cui il paziente percepisce il proprio corpo dopo l\'amputazione. Include esercizi di visualizzazione, uso di specchi, tecniche artistiche o dialogo guidato per affrontare l\'alterazione dello schema corporeo.',
                'time_modifica' => $now,
                'record_attivo' => 1,
            ),
        ));
    }
}

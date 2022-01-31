<?php

namespace App\Traits;

trait NewValue
{
    public static function getNewNum()
    {
        $lastModel = self::withTrashed()
            ->orderBy('created_at', 'DESC')
            ->first();

        if (!$lastModel) {
            return '00000000';
        }

        $newNum = str_pad($lastModel->num + 1, 8, '0', STR_PAD_LEFT);
        return $newNum;
    }
}

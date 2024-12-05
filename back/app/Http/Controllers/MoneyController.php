<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MoneyController extends Controller
{
    public function addMoney(Request $request) {
        $request->user()->money = $request->amount + $request->user()->money;
        $request->user()->save();
        return response()->json([
            'money' => $request->user()->money,    
        ]);
    }

    public function getMoney(Request $request) {
        return response()->json([
            'money' => $request->user()->money,
        ]);
    }
}

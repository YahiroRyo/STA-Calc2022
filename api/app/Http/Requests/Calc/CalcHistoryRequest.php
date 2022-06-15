<?php

namespace App\Http\Requests\Calc;

use Illuminate\Foundation\Http\FormRequest;

class CalcHistoryRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'calc' => ['required', 'max:500'],
        ];
    }
}

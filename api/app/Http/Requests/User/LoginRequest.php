<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'user_name' => ['required', 'max:30'],
            'password' => ['required', 'min:6', 'max:256'],
        ];
    }
}

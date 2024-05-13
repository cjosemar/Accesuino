<?php


namespace App\Transformers;


use App\Transformers\Users\UserTransformer;
use Laravel\Passport\PersonalAccessTokenResult;
use League\Fractal\TransformerAbstract;

class PersonalAccessTokenResultTransformer extends TransformerAbstract
{

    /**
     * @param PersonalAccessTokenResult $personalAccessTokenResult
     * @return array
     */
    public function tranform(PersonalAccessTokenResult $personalAccessTokenResult)
    {
        return [
            'access_token' => $personalAccessTokenResult->accessToken,
            'user' => $this->getUser($personalAccessTokenResult)
        ];
    }

    private function getUser(PersonalAccessTokenResult $personalAccessTokenResult)
    {
        $user = $personalAccessTokenResult->token->user;
        if($user) {
            return (new UserTransformer())->transform($user);
        }
        return null;
    }
}
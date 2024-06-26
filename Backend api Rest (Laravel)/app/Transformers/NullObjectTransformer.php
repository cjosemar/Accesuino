<?php


namespace App\Transformers;


use League\Fractal\TransformerAbstract;

class NullObjectTransformer extends TransformerAbstract
{
    /**
     * @param NullObject $nothing
     * @return array
     */
    public function transform(NullObject $nothing) {
        return  [];
    }

}
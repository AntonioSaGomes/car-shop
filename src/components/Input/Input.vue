<template>
    <div class="input-container">
        <label class="capitalize bold" :for="label">{{label}}</label>
        <input :type="type" :placeholder="placeholder" :id="label" :name="name" v-model="inputValue" />
    </div>
</template>


<script>
    export default{
        props: {
            label:{
                type:String,
                required:true
            },
            type:{
                type: String,
                default: 'text'
            },
            placeholder:{
                type: String,
                default: ''
            }
        },
        data() {
            return {
                inputValue: ''
            }
        },
    }

</script>


<style  scoped>
    .input-container{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .input-container input{
        padding:0.5rem;
        width:max(200px,50%);
    }

    .input-container input::placeholder{
        text-transform: capitalize;
    }

    input,label{
        width:75%;
    }

</style>
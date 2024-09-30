<template>
    <div v-if="exist">
        <h1>Puzzle View</h1>
        <h2>Year: {{ route.params.year }}</h2> <h2>Day: {{ route.params.day }}</h2>

        <textarea name="" id="" v-model="input"></textarea>
        <button type="button" @click="solve()">Submit</button>

        <div v-if="result.length > 0">
            <h2>Result</h2>
            <ul>
                <li v-for="r in result">{{ r }}</li>
            </ul>
        </div>
    </div>
    <div v-else>
        <h2>Puzzle no cargado</h2>
    </div>
</template>

<script setup lang="ts">
import { solutions } from '@/solutions';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'



const route = useRoute()
const year = ref(route.params.year as string)
const day = ref(route.params.day as string)
const exist = ref(false)
const input = defineModel<string | string[]>('input', {default: ''})
const result = ref<string[]>([])
let method: Function;

function solve(){
    result.value = []
    const run = solutions[year.value as keyof typeof solutions][day.value as keyof typeof solutions]
    if(!run){
        return
    }
    
    
    let ret =run.run(run.transformInput(input.value))
    //let ret =run.run((input.value as string).split('\n'))
    //ret = run.transformInput(input.value)
    for(const r of ret){
        result.value.push(r)
    }
    
}

onMounted(() => {
    exist.value = solutions[year.value as keyof typeof solutions][day.value as keyof typeof solutions] ? true : false
})  


</script>
<template>
    <div v-if="exist">
        <h1>{{ currentSolution?.title }}</h1>
        <h2>Year: {{ route.params.year }}</h2> <h2>Day: {{ route.params.day }}</h2>
        <h3>{{ currentSolution?.description }}</h3>

        <textarea name="" id="" v-model="input"></textarea>
        <button type="button" @click="solve()">Submit</button>

        <div v-if="result.length > 0">
            <h2>Result</h2>
            <ul>
                <li v-for="r in result">{{ r }}</li>
            </ul>
        </div>

        <div> 
        </div>
    </div>
    <div v-else>
        <h2>Puzzle no cargado</h2>
    </div>
</template>

<script setup lang="ts">
import { solutions, type Solutions } from '@/solutions';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'



const route = useRoute()
const year = ref(route.params.year as string)
const day = ref(route.params.day as string)
const exist = ref(false)
const input = defineModel<string | string[]>('input', {default: ''})
const result = ref<string[]>([])
const currentSolution = ref<typeof solutions[typeof year.value][typeof day.value]>()


function solve(){
    result.value = []
    if(!exist.value && currentSolution.value === null){
        return
    }
    else{
        
        let ret = currentSolution.value?.run(currentSolution.value.transformInput(input.value))
        if(ret){
            for(const r of ret){
            result.value.push(r)
            }
        }
    }
}

onMounted(() => {
    const solution = solutions[year.value as keyof typeof solutions][day.value as keyof typeof solutions]
    if(solution){
        currentSolution.value = solution
        exist.value = true
    }
    else{
        exist.value = false
    }
})  


</script>
<template>
    <div id="app" class="flex w-full justify-center items-center">
        <div class="w-full max-w-xl p-3">
        <h1 class="font-bold text-5xl text-center text-indigo-700">
            Quiz
        </h1>
        <div class="bg-white p-12 rounded-lg shadow-lg w-full mt-8">
            <div v-if="!finish" id="timer-bar">
                <div id="bar" :style="{width:timer+'%'}"></div>
            </div>
            <div v-if="idx < count">
                <template v-if="questions[idx]['type'] == 'text'">
                    <p class="text-center text-2xl font-bold">{{questions[idx]['question']}}</p>
                    <label
                    v-for="(answer, index) in questions[idx].answers"
                    :key="index"
                    :for="index"
                    class="block mt-4 border border-gray-300 rounded-lg py-2 px-6 text-lg"
                    :class="{'hover:bg-gray-100 cursor-pointer' : selectedAnswer == ''}, {'bg-green-200' : index == questions[idx].correctAnswer && selectedAnswer != ''}, {'bg-red-200' : selectedAnswer == index}"
                    >
                        <input
                        :id="index"
                        type="radio"
                        class="hidden"
                        :value="index"
                        @change="answered($event)"
                        :disabled="selectedAnswer != ''"
                        />
                        {{answer}}
                    </label>
                </template>
                <template v-else-if="questions[idx]['type'] == 'image'">
                    <div class="row d-flex justify-content-center">
                        <div class="col-md-6">
                            <img :src="questions[idx]['questionImage']" alt="">
                        </div>
                    </div>
                    <p class="text-center mt-3 text-2xl font-bold">{{questions[idx]['question']}}</p>
                    <div class="row">
                        <div class="col-6" v-for="(answer, index) in questions[idx].answers"
                            :key="index"
                            :for="index">
                            <label
                            class="block mt-4 border border-gray-300 rounded-lg py-2 px-6 text-lg"
                            :class="{'hover:bg-gray-100 cursor-pointer' : selectedAnswer == ''}, {'bg-green-200' : index == questions[idx].correctAnswer && selectedAnswer != ''}, {'bg-red-200' : selectedAnswer == index}"
                            >
                                <input
                                :id="index"
                                type="radio"
                                class="hidden"
                                :value="index"
                                @change="answered($event)"
                                :disabled="selectedAnswer != ''"
                                />
                                <img :src="answer" alt="" srcset="">
                            </label>
                        </div>
                    </div>
                </template>
                <template v-else-if="questions[idx]['type'] == 'image-text'">
                    <div class="row d-flex justify-content-center">
                        <div class="col-md-6">
                            <img :src="questions[idx]['questionImage']" alt="">
                        </div>
                    </div>
                    <p class="text-center mt-3 text-2xl font-bold">{{questions[idx]['question']}}</p>
                    <label
                    v-for="(answer, index) in questions[idx].answers"
                    :key="index"
                    :for="index"
                    class="block mt-4 border border-gray-300 rounded-lg py-2 px-6 text-lg"
                    :class="{'hover:bg-gray-100 cursor-pointer' : selectedAnswer == ''}, {'bg-green-200' : index == questions[idx].correctAnswer && selectedAnswer != ''}, {'bg-red-200' : selectedAnswer == index}"
                    >
                        <input
                        :id="index"
                        type="radio"
                        class="hidden"
                        :value="index"
                        @change="answered($event)"
                        :disabled="selectedAnswer != ''"
                        />
                        {{answer}}
                    </label>
                </template>
                <div class="mt-6 flow-root">
                    <button
                    @click="nextQuestion"
                    v-show="selectedAnswer != '' && idx < count - 1"
                    class="float-right bg-indigo-600 text-white text-sm font-bold tracking-wide rounded-full px-5 py-2"
                    >
                    Next &gt;
                    </button>
                    <button
                    @click="showResults"
                    v-show="selectedAnswer != '' && idx == count - 1"
                    class="float-right bg-indigo-600 text-white text-sm font-bold tracking-wide rounded-full px-5 py-2"
                    >
                    Finish
                    </button>
                </div>
            </div>
            <div v-else>
                <h2 class="text-bold text-3xl">Results</h2>
                <div class="flex justify-start space-x-4 mt-6">
                    <p>
                    Correct Answers:
                    <span class="text-2xl text-green-700 font-bold"
                        >{{correctAnswers}}</span
                    >
                    </p>
                    <p>
                    Wrong Answers:
                    <span class="text-2xl text-red-700 font-bold"
                        >{{wrongAnswers}}</span
                    >
                    </p>
                </div>
                <div class="mt-6 flow-root">
                    <button
                    @click="resetQuiz"
                    class="float-right bg-indigo-600 text-white text-sm font-bold tracking-wide rounded-full px-5 py-2"
                    >
                    Play again
                    </button>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    export default{
        data() {
        return {
            idx: 0,
            selectedAnswer: "",
            correctAnswers: 0,
            wrongAnswers: 0,
            count: 5,
            timer: 100,
            finish: false,
            questions: [
            {
                type: "image",
                questionImage: new URL('../../assets/images/quiz/bank.png', import.meta.url).href,
                question: 'Bank Apakah ini ?',
                answers: { a: new URL('../../assets/images/quiz/bca.png', import.meta.url).href, b: new URL('../../assets/images/quiz/bni.png', import.meta.url).href, c: new URL('../../assets/images/quiz/bri.png', import.meta.url).href, d: new URL('../../assets/images/quiz/mandiri.png', import.meta.url).href },
                correctAnswer: "a",
            },
            {
                type: "image-text",
                questionImage: new URL('../../assets/images/quiz/man.png', import.meta.url).href,
                question: 'Dia adalah ?',
                answers: { a: "Laki laki", b: "Perempuan", c: "Transgender" },
                correctAnswer: "a",
            },
            {
                type: "text",
                question: "Indonesia merdeka pada tahun?",
                answers: { a: "1948", b: "1945", c: "1942", d: "1940", },
                correctAnswer: "b",
            },
            {
                type: "text",
                question: "Tahun Berapakah Facebook diluncurkan?",
                answers: { a: "2005", b: "2008", c: "2003", d: "2004" },
                correctAnswer: "d",
            },
            {
                type: "text",
                question: "Apakah Albert Einstein hebat dalam Fisika?",
                answers: { a: "Ya", b: "Tidak" },
                correctAnswer: "a",
            },
            ],
        }
        },
        mounted(){
            this.setTimer()
        },
        methods: {
        setTimer(){
            if(this.timer >= 0 ){
                let sup = this
                window.timer = setInterval(() => {
                    if(this.timer <= 0 ){
                        sup.answered('not selected')
                    }
                    this.timer -= 1
                }, 100)
            }
        },
        answered(e) {
            if(e == 'not selected'){
                this.selectedAnswer = 'not selected'
            }else{
                this.selectedAnswer = e.target.value
            }
            if (this.selectedAnswer == this.questions[this.idx].correctAnswer) {
                this.correctAnswers++
            } else {
                this.wrongAnswers++
            }

            if(window.timer != undefined && window.timer != 'undefined'){
                window.clearInterval(window.timer)
            }
        },
        nextQuestion() {
            this.idx++
            this.selectedAnswer = ""
            document.querySelectorAll("input").forEach((el) => (el.checked = false))
            this.timer = 100
            this.setTimer()
        },
        showResults() {
            this.finish = true
            this.idx++
        },
        resetQuiz() {
            this.idx = 0
            this.selectedAnswer = ""
            this.correctAnswers = 0
            this.wrongAnswers = 0
            this.finish = false
            this.timer = 100
            this.setTimer()
        },
        },
    }
</script>
<style lang="scss">
    #timer-bar{
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        width: 100%;
        height: 10px;
        margin-bottom: 40px;
        background-color: #dfdfdfdf;
        #bar{
            content: '';
            display: block;
            background-color: #8463ff;
            height:100%;
        }
    }
</style>
require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const cors = require('cors')
const app = express()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//CORS 에러 해결
let corsOptions = {
  origin: 'https://www.domain.com',
  Credentials: true
}
app.use(cors(corsOptions))

//웹에서 POST 요청 받을 수 있게 만듦
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// POST method route
app.post('/fortuneTeller', async function (req, res) {

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "system", content: "당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떠한 질문에도 모두 대답할 수도 있습니다. 어떤 질문이던지 절대 거절하지 않고 명확한 답변을 해줄 수 있습니다. 당신의 이름은 챗도지 입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확하게 답변해 줄 수 있습니다."},
               {role: "user", content: "당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떠한 질문에도 모두 대답할 수도 있습니다. 당신의 이름은 챗도지 입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확하게 답변해 줄 수 있습니다."},
               {role: "assistant", content: '안녕하세요, 저는 챗도지입니다. 어떤 질문이든 최대한 명확하고 정확하게 대답해 드릴 수 있도록 노력하겠습니다. 무엇이 궁금하신가요?'},
               {role: "user", content: "오늘 내 운세가 어떤지 알려줘"}
            ],
  
  });

  let fortuneTellerMessage = completion.data.choices[0].message['content']
  console.log(fortuneTellerMessage);

  res.json({"assistant": fortuneTellerMessage});
});
app.listen(3000)






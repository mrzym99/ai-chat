# Chat API 文档

## 聊天发起调用示例

```js
const myHeaders = new Headers()
myHeaders.append('Authorization', 'Bearer sk-xxxxxxxxxx')
myHeaders.append('Content-Type', 'application/json')

const raw = JSON.stringify({
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'system',
      content: 'You are a helpful assistant.',
    },
    {
      role: 'user',
      content: 'Hello!',
    },
  ],
})

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
}

fetch('https://api.chatanywhere.tech/v1/chat/completions', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error))
```

# 接口定义

```ts
export interface ApifoxModel {
  /**
   * -2.0 和 2.0 之间的数字。正值会根据新标记在文本中的现有频率对其进行惩罚，从而降低模型逐字重复同一行的可能性。
   * [查看有关频率和存在惩罚的更多信息。](https://platform.openai.com/docs/api-reference/parameter-details)
   */
  frequency_penalty?: number
  /**
   * 修改指定标记出现在生成中的可能性。  接受一个 json 对象，该对象将标记（由标记器中的标记 ID 指定）映射到从 -100 到 100
   * 的关联偏差值。从数学上讲，偏差会在采样之前添加到模型生成的 logits 中。确切的效果因模型而异，但 -1 和 1 之间的值应该会减少或增加选择的可能性；像 -100 或
   * 100 这样的值应该导致相关令牌的禁止或独占选择。
   */
  logit_bias?: { [key: string]: any }
  /**
   * 是否返回输出标记的对数概率。如果为 true，则返回message的content中返回的每个输出token的对数概率。
   */
  logprobs?: boolean
  /**
   * 聊天完成时生成的最大令牌数。  输入标记和生成标记的总长度受模型上下文长度的限制。
   */
  max_tokens?: number
  /**
   * 以[聊天格式](https://platform.openai.com/docs/guides/chat/introduction)生成聊天完成的消息。
   */
  messages: Message[]
  /**
   * 要使用的模型的 ID。有关哪些模型适用于聊天 API
   * 的详细信息，请参阅[模型端点兼容性表。](https://platform.openai.com/docs/models/model-endpoint-compatibility)
   */
  model: string
  /**
   * 为每个输入消息生成多少个聊天完成选项。
   */
  n?: number
  /**
   * -2.0 和 2.0 之间的数字。正值会根据到目前为止是否出现在文本中来惩罚新标记，从而增加模型谈论新主题的可能性。
   * [查看有关频率和存在惩罚的更多信息。](https://platform.openai.com/docs/api-reference/parameter-details)
   */
  presence_penalty?: number
  /**
   * 指定模型必须输出的格式的对象。与GPT-4 Turbo和所有比gpt-3.5-turbo-1106更新的 GPT-3.5 Turbo 模型兼容。 设置为{ "type":
   * "json_object" }启用 JSON 模式，保证模型生成的消息是有效的 JSON。 重要提示：使用 JSON 模式时，您还必须通过系统或用户消息指示模型自行生成
   * JSON。如果不这样做，模型可能会生成无休止的空白流，直到生成达到令牌限制，从而导致长时间运行且看似“卡住”的请求。另请注意，如果finish_reason="length"，消息内容可能会被部分截断，这表示生成超出max_tokens或对话超出了最大上下文长度。
   */
  response_format?: ResponseFormat
  /**
   * API 将停止生成更多令牌的最多 4 个序列。
   */
  stop?: string
  /**
   * 如果设置，将发送部分消息增量，就像在 ChatGPT
   * 中一样。当令牌可用时，令牌将作为纯数据[服务器发送事件](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format)`data:
   * [DONE]`发送，流由消息终止。[有关示例代码](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_stream_completions.ipynb)，请参阅
   * OpenAI Cookbook 。
   */
  stream?: boolean
  /**
   * 流式响应的选项。
   */
  stream_options?: StreamOptions
  /**
   * 使用什么采样温度，介于 0 和 2 之间。较高的值（如 0.8）将使输出更加随机，而较低的值（如 0.2）将使输出更加集中和确定。
   * 我们通常建议改变这个或`top_p`但不是两者。
   */
  temperature?: number
  /**
   * 函数调用使用，参考[OpenAI官方文档](https://platform.openai.com/docs/guides/function-calling)
   */
  tool_choice?: ToolChoiceClass | string
  /**
   * 函数调用使用，参考[OpenAI官方文档](https://platform.openai.com/docs/guides/function-calling)
   */
  tools?: Tool[]
  /**
   * 0 到 20 之间的整数，指定在每个标记位置返回的最可能标记的数量，每个标记均具有相关的对数概率。如果使用此参数，则logprobs必须设置为true。
   */
  top_logprobs?: number
  /**
   * 一种替代温度采样的方法，称为核采样，其中模型考虑具有 top_p 概率质量的标记的结果。所以 0.1 意味着只考虑构成前 10% 概率质量的标记。
   * 我们通常建议改变这个或`temperature`但不是两者。
   */
  top_p?: number
  /**
   * 代表您的最终用户的唯一标识符，可以帮助 OpenAI
   * 监控和检测滥用行为。[了解更多](https://platform.openai.com/docs/guides/safety-best-practices/end-user-ids)。
   */
  user?: string
  [property: string]: any
}

export interface Message {
  content?: string
  role?: string
  [property: string]: any
}

/**
 * 指定模型必须输出的格式的对象。与GPT-4 Turbo和所有比gpt-3.5-turbo-1106更新的 GPT-3.5 Turbo 模型兼容。 设置为{ "type":
 * "json_object" }启用 JSON 模式，保证模型生成的消息是有效的 JSON。 重要提示：使用 JSON 模式时，您还必须通过系统或用户消息指示模型自行生成
 * JSON。如果不这样做，模型可能会生成无休止的空白流，直到生成达到令牌限制，从而导致长时间运行且看似“卡住”的请求。另请注意，如果finish_reason="length"，消息内容可能会被部分截断，这表示生成超出max_tokens或对话超出了最大上下文长度。
 */
export interface ResponseFormat {
  /**
   * 必须是text或json_object。
   */
  type?: string
  [property: string]: any
}

/**
 * 流式响应的选项。
 */
export interface StreamOptions {
  /**
   * 如果设置，则在消息data: [DONE]之前会流式传输一个额外的usage块。此块上的字段显示整个请求的令牌使用情况统计信息，并且该choices字段将始终为空数组。
   */
  include_usage?: boolean
  [property: string]: any
}

export interface ToolChoiceClass {
  function: ToolChoiceFunction
  type: string
}

export interface ToolChoiceFunction {
  name: string
  [property: string]: any
}

export interface Tool {
  function?: ToolFunction
  type: string
  [property: string]: any
}

export interface ToolFunction {
  description?: string
  name: string
  parameters?: { [key: string]: any }
  [property: string]: any
}
```

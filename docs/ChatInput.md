# ChatInput 组件

## 概述

ChatInput 组件提供消息输入功能，支持文本输入、发送和加载状态显示。

## Props

| 属性        | 类型                      | 必填 | 默认值        | 说明         |
| ----------- | ------------------------- | ---- | ------------- | ------------ |
| onSend      | (content: string) => void | 是   | -             | 发送消息回调 |
| loading     | boolean                   | 否   | false         | 是否加载中   |
| disabled    | boolean                   | 否   | false         | 是否禁用     |
| placeholder | string                    | 否   | '输入消息...' | 占位文本     |

## 功能特性

1. **多行文本输入**
   - 支持 Shift+Enter 换行
   - Enter 发送消息

2. **加载状态**
   - 发送中显示加载动画
   - 禁用输入框

3. **自动高度**
   - 输入框高度随内容自适应
   - 最大高度限制

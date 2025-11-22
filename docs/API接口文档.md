# API接口文档

## 目录
1. [文档概述](#1-文档概述)
2. [基础信息](#2-基础信息)
3. [轮播图管理](#3-轮播图管理-banners)
4. [文章管理](#4-文章管理-articles)
5. [案例管理](#5-案例管理-cases)
6. [服务管理](#6-服务管理-services)
7. [内容管理](#7-内容管理-contents)
8. [文件上传](#8-文件上传-uploads)
9. [错误代码说明](#9-错误代码说明)
10. [注意事项](#10-注意事项)

---

## 1. 文档概述

本文档详细描述了官网项目后端API服务提供的所有RESTful API接口，包括轮播图、文章、案例、服务和内容管理等模块的接口规范。所有接口均遵循RESTful设计原则，提供统一的响应格式。

## 2. 基础信息

### 2.1 基础URL

开发环境：`http://localhost:3001/api`

生产环境：根据实际部署情况配置

### 2.2 响应格式

所有API接口返回统一的JSON格式：

```json
{
  "success": true,  // 是否成功
  "data": {},       // 响应数据
  "message": ""     // 响应消息
}
```

### 2.3 HTTP状态码

- `200`: 请求成功
- `400`: 请求参数错误
- `401`: 未授权
- `404`: 资源不存在
- `500`: 服务器内部错误

## 3. 轮播图管理 (Banners)

### 3.1 获取所有轮播图

**路径**: `/api/banners`
**方法**: `GET`
**功能**: 获取所有轮播图列表

#### 请求参数

无

#### 响应示例

```json
{
  "success": true,
  "data": [
    {
      "_id": "60c72b2f9b1e8c0015e7c5e8",
      "title": "轮播图标题1",
      "imageUrl": "/uploads/banner1.jpg",
      "link": "https://example.com",
      "order": 1,
      "isActive": true,
      "createdAt": "2023-01-01T00:00:00.000Z"
    },
    {
      "_id": "60c72b2f9b1e8c0015e7c5e9",
      "title": "轮播图标题2",
      "imageUrl": "/uploads/banner2.jpg",
      "link": "https://example.com/page",
      "order": 2,
      "isActive": true,
      "createdAt": "2023-01-02T00:00:00.000Z"
    }
  ],
  "message": "获取轮播图列表成功"
}
```

### 3.2 获取单个轮播图

**路径**: `/api/banners/:id`
**方法**: `GET`
**功能**: 根据ID获取单个轮播图详情

#### 请求参数

| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| id | String | 是 | 轮播图ID |

#### 响应示例

```json
{
  "success": true,
  "data": {
    "_id": "60c72b2f9b1e8c0015e7c5e8",
    "title": "轮播图标题1",
    "imageUrl": "/uploads/banner1.jpg",
    "link": "https://example.com",
    "order": 1,
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "获取轮播图成功"
}
```

### 3.3 新增轮播图

**路径**: `/api/banners`
**方法**: `POST`
**功能**: 创建新的轮播图

#### 请求参数

| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| title | String | 否 | 轮播图标题 |
| imageUrl | String | 是 | 图片URL |
| link | String | 否 | 跳转链接 |
| order | Number | 否 | 排序（默认0） |
| isActive | Boolean | 否 | 是否激活（默认true） |

#### 请求示例

```json
{
  "title": "新轮播图",
  "imageUrl": "/uploads/new_banner.jpg",
  "link": "https://example.com/new",
  "order": 3,
  "isActive": true
}
```

#### 响应示例

```json
{
  "success": true,
  "data": {
    "_id": "60c72b2f9b1e8c0015e7c5ea",
    "title": "新轮播图",
    "imageUrl": "/uploads/new_banner.jpg",
    "link": "https://example.com/new",
    "order": 3,
    "isActive": true,
    "createdAt": "2023-01-03T00:00:00.000Z"
  },
  "message": "创建轮播图成功"
}
```

### 3.4 更新轮播图

**路径**: `/api/banners/:id`
**方法**: `PUT`
**功能**: 更新指定轮播图

#### 请求参数

| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| id | String | 是 | 轮播图ID |
| title | String | 否 | 轮播图标题 |
| imageUrl | String | 否 | 图片URL |
| link | String | 否 | 跳转链接 |
| order | Number | 否 | 排序 |
| isActive | Boolean | 否 | 是否激活 |

#### 请求示例

```json
{
  "title": "更新后的轮播图",
  "order": 1,
  "isActive": false
}
```

#### 响应示例

```json
{
  "success": true,
  "data": {
    "_id": "60c72b2f9b1e8c0015e7c5e8",
    "title": "更新后的轮播图",
    "imageUrl": "/uploads/banner1.jpg",
    "link": "https://example.com",
    "order": 1,
    "isActive": false,
    "createdAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "更新轮播图成功"
}
```

### 3.5 删除轮播图

**路径**: `/api/banners/:id`
**方法**: `DELETE`
**功能**: 删除指定轮播图

#### 请求参数

| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| id | String | 是 | 轮播图ID |

#### 响应示例

```json
{
  "success": true,
  "data": null,
  "message": "删除轮播图成功"
}
```

## 4. 文章管理 (Articles)

### 4.1 获取所有文章

**路径**: `/api/articles`
**方法**: `GET`
**功能**: 获取所有文章列表

#### 请求参数

无

#### 响应示例

```json
{
  "success": true,
  "data": [
    {
      "_id": "60c72b2f9b1e8c0015e7c5f0",
      "title": "文章标题1",
      "content": "文章内容...",
      "author": "作者名",
      "imageUrl": "/uploads/article1.jpg",
      "order": 1,
      "isActive": true,
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "message": "获取文章列表成功"
}
```

### 4.2 获取单篇文章

**路径**: `/api/articles/:id`
**方法**: `GET`
**功能**: 根据ID获取单篇文章详情

#### 请求参数

| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| id | String | 是 | 文章ID |

#### 响应示例

```json
{
  "success": true,
  "data": {
    "_id": "60c72b2f9b1e8c0015e7c5f0",
    "title": "文章标题1",
    "content": "文章内容...",
    "author": "作者名",
    "imageUrl": "/uploads/article1.jpg",
    "order": 1,
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "获取文章成功"
}
```

### 4.3 新增文章

**路径**: `/api/articles`
**方法**: `POST`
**功能**: 创建新的文章

#### 请求参数

| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| title | String | 是 | 文章标题 |
| content | String | 是 | 文章内容 |
| author | String | 否 | 作者名 |
| imageUrl | String | 否 | 图片URL |
| order | Number | 否 | 排序（默认0） |
| isActive | Boolean | 否 | 是否激活（默认true） |

#### 请求示例

```json
{
  "title": "新文章",
  "content": "这是一篇新文章的内容...",
  "author": "管理员",
  "imageUrl": "/uploads/new_article.jpg",
  "order": 2,
  "isActive": true
}
```

#### 响应示例

```json
{
  "success": true,
  "data": {
    "_id": "60c72b2f9b1e8c0015e7c5f1",
    "title": "新文章",
    "content": "这是一篇新文章的内容...",
    "author": "管理员",
    "imageUrl": "/uploads/new_article.jpg",
    "order": 2,
    "isActive": true,
    "createdAt": "2023-01-03T00:00:00.000Z"
  },
  "message": "创建文章成功"
}
```

### 4.4 更新文章

**路径**: `/api/articles/:id`
**方法**: `PUT`
**功能**: 更新指定文章

#### 请求参数

| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| id | String | 是 | 文章ID |
| title | String | 否 | 文章标题 |
| content | String | 否 | 文章内容 |
| author | String | 否 | 作者名 |
| imageUrl | String | 否 | 图片URL |
| order | Number | 否 | 排序 |
| isActive | Boolean | 否 | 是否激活 |

#### 响应示例

```json
{
  "success": true,
  "data": {
    "_id": "60c72b2f9b1e8c0015e7c5f0",
    "title": "更新后的文章标题",
    "content": "更新后的文章内容...",
    "author": "管理员",
    "imageUrl": "/uploads/article1.jpg",
    "order": 1,
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "更新文章成功"
}
```

### 4.5 删除文章

**路径**: `/api/articles/:id`
**方法**: `DELETE`
**功能**: 删除指定文章

#### 请求参数

| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| id | String | 是 | 文章ID |

#### 响应示例

```json
{
  "success": true,
  "data": null,
  "message": "删除文章成功"
}
```

## 5. 案例管理 (Cases)

### 5.1 获取所有案例

**路径**: `/api/cases`
**方法**: `GET`
**功能**: 获取所有案例列表

#### 请求参数

无

#### 响应示例

```json
{
  "success": true,
  "data": [
    {
      "_id": "60c72b2f9b1e8c0015e7c5f5",
      "title": "案例标题1",
      "description": "案例描述...",
      "imageUrl": "/uploads/case1.jpg",
      "order": 1,
      "isActive": true,
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "message": "获取案例列表成功"
}
```

### 5.2 获取单个案例

**路径**: `/api/cases/:id`
**方法**: `GET`
**功能**: 根据ID获取单个案例详情

#### 请求参数

| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| id | String | 是 | 案例ID |

#### 响应示例

```json
{
  "success": true,
  "data": {
    "_id": "60c72b2f9b1e8c0015e7c5f5",
    "title": "案例标题1",
    "description": "案例描述...",
    "imageUrl": "/uploads/case1.jpg",
    "order": 1,
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "获取案例成功"
}
```

### 5.3 新增案例

**路径**: `/api/cases`
**方法**: `POST`
**功能**: 创建新的案例

#### 请求参数

| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| title | String | 是 | 案例标题 |
| description | String | 是 | 案例描述 |
| imageUrl | String | 否 | 图片URL |
| order | Number | 否 | 排序（默认0） |
| isActive | Boolean | 否 | 是否激活（默认true） |

#### 请求示例

```json
{
  "title": "新案例",
  "description": "这是一个新案例的描述...",
  "imageUrl": "/uploads/new_case.jpg",
  "order": 2,
  "isActive": true
}
```

#### 响应示例

```json
{
  "success": true,
  "data": {
    "_id": "60c72b2f9b1e8c0015e7c5f6",
    "title": "新案例",
    "description": "这是一个新案例的描述...",
    "imageUrl": "/uploads/new_case.jpg",
    "order": 2,
    "isActive": true,
    "createdAt": "2023-01-03T00:00:00.000Z"
  },
  "message": "创建案例成功"
}
```

### 5.4 更新案例

**路径**: `/api/cases/:id`
**方法**: `PUT`
**功能**: 更新指定案例

#### 请求参数

| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| id | String | 是 | 案例ID |
| title | String | 否 | 案例标题 |
| description | String | 否 | 案例描述 |
| imageUrl | String | 否 | 图片URL |
| order | Number | 否 | 排序 |
| isActive | Boolean | 否 | 是否激活 |

#### 响应示例

```json
{
  "success": true,
  "data": {
    "_id": "60c72b2f9b1e8c0015e7c5f5",
    "title": "更新后的案例标题",
    "description": "更新后的案例描述...",
    "imageUrl": "/uploads/case1.jpg",
    "order": 1,
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "更新案例成功"
}
```

### 5.5 删除案例

**路径**: `/api/cases/:id`
**方法**: `DELETE`
**功能**: 删除指定案例

#### 请求参数

| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| id | String | 是 | 案例ID |

#### 响应示例

```json
{
  "success": true,
  "data": null,
  "message": "删除案例成功"
}
```

## 6. 服务管理 (Services)

### 6.1 获取所有服务

**路径**: `/api/services`
**方法**: `GET`
**功能**: 获取所有服务列表

#### 请求参数

无

#### 响应示例

```json
{
  "success": true,
  "data": [
    {
      "_id": "60c72b2f9b1e8c0015e7c5fb",
      "title": "服务标题1",
      "description": "服务描述...",
      "imageUrl": "/uploads/service1.jpg",
      "order": 1,
      "isActive": true,
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "message": "获取服务列表成功"
}
```

### 6.2 获取单个服务

**路径**: `/api/services/:id`
**方法**: `GET`
**功能**: 根据ID获取单个服务详情

#### 请求参数

| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| id | String | 是 | 服务ID |

#### 响应示例

```json
{
  "success": true,
  "data": {
    "_id": "60c72b2f9b1e8c0015e7c5fb",
    "title": "服务标题1",
    "description": "服务描述...",
    "imageUrl": "/uploads/service1.jpg",
    "order": 1,
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "获取服务成功"
}
```

### 6.3 新增服务

**路径**: `/api/services`
**方法**: `POST`
**功能**: 创建新的服务

#### 请求参数

| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| title | String | 是 | 服务标题 |
| description | String | 是 | 服务描述 |
| imageUrl | String | 否 | 图片URL |
| order | Number | 否 | 排序（默认0） |
| isActive | Boolean | 否 | 是否激活（默认true） |

#### 请求示例

```json
{
  "title": "新服务",
  "description": "这是一个新服务的描述...",
  "imageUrl": "/uploads/new_service.jpg",
  "order": 2,
  "isActive": true
}
```

#### 响应示例

```json
{
  "success": true,
  "data": {
    "_id": "60c72b2f9b1e8c0015e7c5fc",
    "title": "新服务",
    "description": "这是一个新服务的描述...",
    "imageUrl": "/uploads/new_service.jpg",
    "order": 2,
    "isActive": true,
    "createdAt": "2023-01-03T00:00:00.000Z"
  },
  "message": "创建服务成功"
}
```

### 6.4 更新服务

**路径**: `/api/services/:id`
**方法**: `PUT`
**功能**: 更新指定服务

#### 请求参数

| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| id | String | 是 | 服务ID |
| title | String | 否 | 服务标题 |
| description | String | 否 | 服务描述 |
| imageUrl | String | 否 | 图片URL |
| order | Number | 否 | 排序 |
| isActive | Boolean | 否 | 是否激活 |

#### 响应示例

```json
{
  "success": true,
  "data": {
    "_id": "60c72b2f9b1e8c0015e7c5fb",
    "title": "更新后的服务标题",
    "description": "更新后的服务描述...",
    "imageUrl": "/uploads/service1.jpg",
    "order": 1,
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "更新服务成功"
}
```

### 6.5 删除服务

**路径**: `/api/services/:id`
**方法**: `DELETE`
**功能**: 删除指定服务

#### 请求参数

| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| id | String | 是 | 服务ID |

#### 响应示例

```json
{
  "success": true,
  "data": null,
  "message": "删除服务成功"
}
```

## 7. 内容管理 (Contents)

### 7.1 获取所有内容

**路径**: `/api/contents`
**方法**: `GET`
**功能**: 获取所有内容列表

#### 请求参数

无

#### 响应示例

```json
{
  "success": true,
  "data": [
    {
      "_id": "60c72b2f9b1e8c0015e7c600",
      "key": "about_us",
      "title": "关于我们",
      "content": "公司简介内容...",
      "order": 1,
      "isActive": true,
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "message": "获取内容列表成功"
}
```

### 7.2 获取单个内容

**路径**: `/api/contents/:id`
**方法**: `GET`
**功能**: 根据ID获取单个内容详情

#### 请求参数

| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| id | String | 是 | 内容ID |

#### 响应示例

```json
{
  "success": true,
  "data": {
    "_id": "60c72b2f9b1e8c0015e7c600",
    "key": "about_us",
    "title": "关于我们",
    "content": "公司简介内容...",
    "order": 1,
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "获取内容成功"
}
```

### 7.3 新增内容

**路径**: `/api/contents`
**方法**: `POST`
**功能**: 创建新的内容

#### 请求参数

| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| key | String | 是 | 内容标识（唯一） |
| title | String | 是 | 内容标题 |
| content | String | 是 | 内容详情 |
| order | Number | 否 | 排序（默认0） |
| isActive | Boolean | 否 | 是否激活（默认true） |

#### 请求示例

```json
{
  "key": "contact_us",
  "title": "联系我们",
  "content": "联系信息内容...",
  "order": 2,
  "isActive": true
}
```

#### 响应示例

```json
{
  "success": true,
  "data": {
    "_id": "60c72b2f9b1e8c0015e7c601",
    "key": "contact_us",
    "title": "联系我们",
    "content": "联系信息内容...",
    "order": 2,
    "isActive": true,
    "createdAt": "2023-01-03T00:00:00.000Z"
  },
  "message": "创建内容成功"
}
```

### 7.4 更新内容

**路径**: `/api/contents/:id`
**方法**: `PUT`
**功能**: 更新指定内容

#### 请求参数

| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| id | String | 是 | 内容ID |
| key | String | 否 | 内容标识 |
| title | String | 否 | 内容标题 |
| content | String | 否 | 内容详情 |
| order | Number | 否 | 排序 |
| isActive | Boolean | 否 | 是否激活 |

#### 响应示例

```json
{
  "success": true,
  "data": {
    "_id": "60c72b2f9b1e8c0015e7c600",
    "key": "about_us",
    "title": "关于我们更新",
    "content": "更新后的公司简介内容...",
    "order": 1,
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "更新内容成功"
}
```

### 7.5 删除内容

**路径**: `/api/contents/:id`
**方法**: `DELETE`
**功能**: 删除指定内容

#### 请求参数

| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| id | String | 是 | 内容ID |

#### 响应示例

```json
{
  "success": true,
  "data": null,
  "message": "删除内容成功"
}
```

## 8. 文件上传 (Uploads)

### 8.1 上传图片

**路径**: `/api/upload`
**方法**: `POST`
**功能**: 上传图片文件

#### 请求参数

| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| file | File | 是 | 图片文件（JPEG, JPG, PNG, GIF, WebP格式，最大5MB） |

#### 请求格式

表单数据（multipart/form-data）

#### 响应示例

```json
{
  "success": true,
  "data": {
    "url": "/uploads/1634567890123.jpg"
  },
  "message": "上传成功"
}
```

## 9. 错误代码说明

| 错误消息 | 说明 | 处理建议 |
|---------|------|----------|
| 获取轮播图列表失败 | 轮播图数据获取出错 | 检查数据库连接或查看服务器日志 |
| 轮播图不存在 | 请求的轮播图ID不存在 | 检查轮播图ID是否正确 |
| 请上传轮播图 | 缺少必要的图片URL | 确保提供了有效的图片URL |
| 删除轮播图失败 | 轮播图删除操作失败 | 检查权限或数据库状态 |
| 只支持图片格式(jpeg, jpg, png, gif, webp) | 文件格式不符合要求 | 确保上传的是支持的图片格式 |
| 文件大小不能超过5MB | 文件大小超过限制 | 压缩图片或选择更小的文件 |

## 10. 注意事项

1. 所有API请求都需要在请求头中设置适当的Content-Type
2. 文件上传使用multipart/form-data格式
3. 数据库连接失败时，部分API会返回模拟数据作为降级方案
4. 建议在生产环境中配置适当的API访问权限控制
5. 上传的文件存储在服务器的uploads目录下
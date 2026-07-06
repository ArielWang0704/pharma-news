# Pharma News

这是一个用于长期归档和检索中国医药健康市场新闻的静态网页项目。

## 固定网址

部署到 GitHub Pages 后，建议固定访问地址为：

```text
https://arielwang0704.github.io/pharma-news/
```

## 文件说明

- `index.html`：主网页，包含新闻数据、搜索、分类 tab、月份筛选、Viatris 高相关筛选和展开详情。
- `.nojekyll`：告诉 GitHub Pages 按普通静态网页发布，不启用 Jekyll 处理。

## 第一次部署

1. 登录 GitHub。
2. 新建一个 repository，名称建议使用：

```text
pharma-news
```

3. Repository visibility 可以选择 `Public`，这样 GitHub Pages 免费可用且配置最简单。
4. 上传本文件夹里的全部文件：
   - `index.html`
   - `.nojekyll`
   - `README.md`
5. 进入 repository 的 `Settings`。
6. 在左侧找到 `Pages`。
7. Source 选择：

```text
Deploy from a branch
```

8. Branch 选择：

```text
main
```

9. Folder 选择：

```text
/ (root)
```

10. 保存后等待 1-3 分钟，页面会发布到：

```text
https://arielwang0704.github.io/pharma-news/
```

## 每周更新方式

每周更新时，只需要替换 `index.html`。

推荐流程：

1. 让 Codex 基于上一版 `index.html` 加入本周新闻。
2. 保持文件名仍为 `index.html`。
3. 上传并覆盖 GitHub repository 里的 `index.html`。
4. 固定网址不变，刷新页面即可看到最新内容。

## 内容更新原则

- 新新闻添加为新的事件卡片。
- 同一新闻后续有进展时，不新建重复卡片，优先补充到原卡片的“事件进展”时间线。
- 每条新闻默认摘要保持简洁，展开后写清楚新闻背景、发生了什么、为什么重要、行业启发和后续观察点。
- 只有 Viatris 高相关事件才显示“Viatris高相关”标记。
- 右侧保留：
  - 今年值得记住
  - 可复用观点
  - 后续重点追踪

## 隐私提醒

如果 repository 是公开的，网页内容理论上可以被任何知道链接的人访问。建议不要在网页里写入个人身份、公司内部信息、未公开信息或敏感判断。

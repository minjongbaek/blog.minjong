---
title: "proxy 환경에서 UNABLE_TO_GET_ISSUER_CERT_LOCALLY 에러 해결하기"
description: "proxy 환경의 node 클라이언트에서 https로 요청을 보낼 때 발생하는 UNABLE_TO_GET_ISSUER_CERT_LOCALLY 에러 해결하기"
date: 2023-10-21
tags: ["node", "proxy", "UNABLE_TO_GET_ISSUER_CERT_LOCALLY"]
---

# 방법 1

node에서 요청을 보내야 하는 프록시 서버와 최상위 인증서 파일을 설정한다.

```bash
npm config set https-proxy [https://proxy-server-host]
npm config set http-proxy [http://proxy-server-host]
npm config set cafile [path-to-my-cert.pem]
```

# 방법 2

node 환경 변수를 추가해서 신뢰할 수 없는 인증서를 허용할 수 있다.

다만 중간자 공격에 취약해질 수 있으니 신중하게 사용하자.

```bash
NODE_TLS_REJECT_UNAUTHORIZED=0
```

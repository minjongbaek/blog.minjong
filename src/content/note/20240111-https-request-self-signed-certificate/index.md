---
title: "Node.js 애플리케이션에서 자체 서명된 인증서로 SSL/TLS 연결 허용하기"
description: "자체 서명 인증서를 사용한 환경에서 발생하는 CERT_SIGNATURE_FAILURE 오류 해결해보자."
date: 2024-01-11
tags: ["vpn", "ssl", "CERT_SIGNATURE_FAILURE"]
---

# Node 환경 변수 설정

```
NODE_TLS_REJECT_UNAUTHORIZED=0
```

# CERT_SIGNATURE_FAILURE

`NODE_TLS_REJECT_UNAUTHORIZED` 환경변수를 `0`으로 설정해서 인증서 검증을 비활성화 할 수 있다.

회사 내부망에서 Node.js 애플리케이션으로 https 요청을 보낼 때 `CERT_SIGNATURE_FAILURE` 에러가 발생할 수 있다.

내부망에 프록시까지 붙어있다면 SSL/TLS 트래픽을 감지하기 위해 보안 업체에서 서명한 인증서를 사용할 확률이 높다. 이런 인증서는 CA에 의해 서명되지 않았기 때문에 Node.js 는 신뢰할 수 없는 인증서라 판단하고 TLS/SSL 연결을 허용하지 않게 된다.

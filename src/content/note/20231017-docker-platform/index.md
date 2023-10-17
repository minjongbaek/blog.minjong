---
title: "애플 실리콘(M1, M2)에서 docker 로 rockylinux 실행하기"
description: "docker: no matching manifest for linux/arm64/v8 in the manifest list entries."
date: 2023-10-17
tags: ["docker"]
---

# rockylinux 컨테이너 생성 및 실행

```bash
docker run \
--platform linux/amd64 \
--privileged -d \
rockylinux/rockylinux /sbin/init
```

- `-platform`: 컨테이너를 실행할 때 사용할 플랫폼
  - 작성일 기준으로 arm64와 완벽하게 호환되지 않아 `linux/amd64` 아키텍처로 실행
- `--privileged`: 컨테이너가 모든 호스트 장치에 접근하도록 권한을 부여
- `-d`: 백그라운드 실행
- `/sbin/init`: 시스템 초기화 작업 프로세스 실행
  - 서비스나 데몬 등 일반 리눅스 시스템과 유사한 프로세스 경험을 위함

-`p`: 포트 포워딩 [HOST]:[CONTAINER]

# rockylinux 세션 접속

```bash
docker exec -it [container_id_or_name] /bin/bash
```

- '-it': 컨테이너와 상호작용 가능한 터미널 환경을 생성

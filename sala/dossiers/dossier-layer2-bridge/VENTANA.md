# Ventana de contexto

## Rooms-UI

### Paradigma-base

Se trata e un spin-off de ssb. Reaprovecha parte del ecosistema ssb-db2,...

https://github.com/ssbc/ssb-db2

... pero avanza a su propio ecosistema.

https://github.com/s1ko/SSBv2.git

### Gaps del roadmap donde queremos extender

https://github.com/s1ko/ssbv2#roadmap

- 2A	Rooms / NAT traversal	done
- 2B	Rooms UI	pending

- 3A	Tribes box2 — ssb-tribes2 + ssb-box2 in stack	done
- 3B	Tribes model migration (app layer)	pending

- 4A	WebSocket transport	done

- 7	Extensions and search	pending
- 9B	Ephemeral rooms signaling protocol	done
- 9C	Audio calls (snh-comm)	pending

## Oasis v1 - SSBv2

Queremos generar un módulo basándonos en la acutal oasis-v1-ssb_db:

- https://github.com/epsylon/oasis/tree/main v 0.7.6


https://github.com/epsylon/oasis/tree/main#modules

```
Oasis is TRULY MODULAR. Here's a list of what comes deployed with the "core".
Both the codebase and the inhabitants can generate new modules.
```

Nuestra aportación debe situarse en la frontera de migración inminente desde oasis v1 a v2, y planificar código para v2_ssb-db2.

## pub.escrivivir.co

Actualmente ya tenemos nuestro pub conectado a oasis v1, será refactorizado a ssb-v2 y nuestra base de operaciones:

https://pub.escrivivir.co

En nuestro caso, tenemos un vps-dockerizado con oasis corriendo en modo server, pero planificamos con vistas a la replicabilidad del nodo publicando los dockers (futuro subir imagenes a docker hub):

https://github.com/escrivivir-co/alephscript-network-sdk/tree/main/OASIS_PUB

## ssb.oasis.client Scriptorium App

Aunque convive en la misma codebase que el pub anterior es totalmente independiente la dockerizacion de oasis server. Esta está corriendo en modo cliente y es la semilla más habitual para nuevos usuarios que vengan a la red:

https://escrivivir-co.github.io/alephscript-network-sdk/


## Main target feature use case

Flujos layer 1 a layer 2 y vuelta.

https://github.com/escrivivir-co/alephscript-network-sdk/tree/integration/beta/scriptorium/OASIS_PUB/site/parlament

## Scriptorium Layer 2 Provider

En la propuesta anterior se describe una abstracción inicial del uso de nuestra extensión modulo. De forma concreta:

- Layer SSB - Oasis

https://github.com/escrivivir-co/aleph-scriptorium/tree/integration/beta/scriptorium/sala/dossiers/scriptorium-vps

- Layer 2: node-red, socket.io, pub.relay

https://github.com/escrivivir-co/aleph-scriptorium/tree/integration/beta/scriptorium/sala/dossiers/scriptorium-vps

- Layer 3: webrtc

Big plan: https://github.com/escrivivir-co/simple-ssb-webrtc

Easy webrtc over ui: https://github.com/escrivivir-co/simple-ssb-webrtc/tree/oasis-pr

Y por la parte del descubrimiento de peers federados más el gate de bots a través de IACM. Lee los mensajes y reconstruye el histórico de la colaboración con Retro (d1d4c):

https://github.com/escrivivir-co/heteronimos-semi-asistidos-sdk/tree/integration/beta/scriptorium/examples/dashboard/userdata

## Scriptorium Layer 2

https://admin.scriptorium.escrivivir.co/red/#flow/task09-rooms-mvp

https://scriptorium.escrivivir.co/dashboard/rooms

https://npm.scriptorium.escrivivir.co/-/web/detail/node-red-dashboard-2-alephscript-rooms


# Arch

```
aleph@DESKTOP-7443I02 MINGW64 ~/OASIS/aleph-scriptorium/ScriptoriumVps (integration/beta/scriptorium)

$  cd /c/Users/aleph/OASIS/alephscript-network-sdk && ssh -i GANDI_DEVOPS_FOLDER/.ssh/gandi_pub_ed25519 -o BatchMode=yes -o StrictHostKeyChecking=accept-new -o ConnectTimeout=15 debian@92.243.24.163 "hostname && whoami && date -u +%FT%TZ"
escrivivirco-scriptorium-pub-oasis
debian
2026-05-09T18:04:31Z
```

```bash
aleph@DESKTOP-7443I02 MINGW64 ~/OASIS/alephscript-network-sdk (integration/beta/scriptorium)
$  cd /c/Users/aleph/OASIS/alephscript-network-sdk && ssh -i GANDI_DEVOPS_FOLDER/.ssh/gandi_pub_ed25519 -o BatchMode=yes -o StrictHostKeyChecking=accept-new debian@92.243.24.163 '
set -e
printf "== docker ps ==\n"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
printf "\n== node-red package versions ==\n"
docker exec scriptorium-vps-nodered-1 npm ls node-red-dashboard-2-alephscript-rooms node-red-contrib-alephscript-core @alephscript/mcp-core-sdk --depth=0 || true
printf "\n== oasis_pub_net aliases ==\n"
docker network inspect oasis-pub-scriptorium_oasis_pub_net --format "{{json .Containers}}" | python3 - <<"PY"
import json,sys
containers=json.load(sys.stdin)
for cid,data in containers.items():
    name=data.get("Name")
    aliases=data.get("Aliases") or []
    print(f"{name}: aliases={aliases}")
PY
' && printf '\n== dns ==\n' && (command -v dig >/dev/null 2>&1 && dig +short rooms.scriptorium.escrivivir.co || nslookup rooms.scriptorium.escrivivir.co | sed -n '1,20p')
== docker ps ==
NAMES                         STATUS                 PORTS
scriptorium-vps-verdaccio-1   Up 6 hours (healthy)   4873/tcp
scriptorium-vps-nodered-1     Up 4 hours (healthy)   1880/tcp
oasis-pub-web                 Up 8 days              0.0.0.0:80->80/tcp, :::80->80/tcp, 0.0.0.0:443->443/tcp, :::443->443/tcp, 443/udp, 2019/tcp
oasis-pub-panel-api           Up 8 days              127.0.0.1:8787->8787/tcp
oasis-pub-scriptorium         Up 7 days (healthy)    3000/tcp, 0.0.0.0:8008->8008/tcp, :::8008->8008/tcp
```

# CLIENT

{
  "node": "v20.20.2",
  "pkg": "0.7.4",
  "caps": "zTmidAb7t+tKi7W93FIHbOvlbd936x6G/vm8e8Td//A=",
  "path": "/home/oasis/.ssb",
  "manifestExists": true,
  "inviteAccept": true,
  "inviteCreate": true,
  "ebtReplicate": true,
  "conn": true,
  "gossip": true
}

# SERVER



https://admin.gandi.net/gostack/ee5ffadc-4565-11f1-b091-00163e816020/servers/e15db33f-27b1-4ad3-8803-bbefe7974d70/overview

## escrivivirco-scriptorium-pub-oasis
ACTIVE
Datacenter FR-SD6: operational
Public IPv4
92.243.24.163
Public IPv6
2001:4b98:dc0:43:f816:3eff:feb7:a5b5

## Configuration
V-R4: 2 CPUs · 4 GB RAM
Total storage
25 GB
Location
Paris, SD6

Access your server

From your terminal, access this server with the following authentication information.

```bash
SSH access
ssh debian@92.243.24.163
Registered SSH key
oasis-pub-scriptorium@gandi-vps
```

# IP Addresses
Public IP address	rDNS	
92.243.24.163
2001:4b98:dc0:43:f816:3eff:feb7:a5b5

xvm-24-163.sd6.ghst.net
xvm6-feb7-a5b5.sd6.ghst.net


# Volumes 

vps-boot
Volume ID
55f0e620-cc53-479d-88f5-68269886b3b8
IN USE
Volume size
25 GB
Attached server
escrivivirco-scriptorium-pub-oasis
Source image
Debian 13 TrixieBoot


scriptorium-oasis-pub-volumen
Volume ID
5e4ef192-48a3-4b1b-afeb-2c00985859a3
IN USE
Volume size
40 GB
Attached server
escrivivirco-scriptorium-pub-oasis
Source image
Debian 13 Trixie


```
aleph@DESKTOP-7443I02 MINGW64 ~/OASIS/alephscript-network-sdk/GANDI_DEVOPS_FOLDER (integration/beta/scriptorium)
$  cd /c/Users/aleph/OASIS/alephscript-network-sdk && ssh -i GANDI_DEVOPS_FOLDER/.ssh/gandi_pub_ed25519 -o StrictHostKeyChecking=accept-new debian@92.243.24.163 "
echo '=== CONTAINER STATE ==='
docker inspect scriptorium-vps-nodered-1 --format='Status: {{.State.Status}} | Health: {{.State.Health.Status}}'

echo ''
echo '=== MOUNTS ==='
docker inspect scriptorium-vps-nodered-1 --format='{{json .Mounts}}' | python3 -c \"import sys,json; [print(m['Type'], m.get('Source','?'), '->', m['Destination']) for m in json.load(sys.stdin)]\"

echo ''
echo '=== UID/GID inside container ==='
docker exec scriptorium-vps-nodered-1 id

echo ''
echo '=== /data root listing (not subdirs) ==='
docker exec scriptorium-vps-nodered-1 ls -la /data/ | head -30

echo ''
echo '=== /data disk usage ==='
docker exec scriptorium-vps-nodered-1 du -sh /data/ 2>/dev/null || true
docker exec scriptorium-vps-nodered-1 du -sh /data/node_modules 2>/dev/null || echo 'no node_modules'

echo ''
echo '=== SCRIPTORIUM_REMOTE_ROOT on host ==='
cat /opt/aleph/scriptorium/.env 2>/dev/null | grep REMOTE_ROOT || cat /opt/aleph-scriptorium/scriptorium-vps/.env 2>/dev/null | grep REMOTE_ROOT || find /opt -n"f -h /opt 2>/dev/null || df -h /
=== CONTAINER STATE ===
Status: running | Health: healthy

=== MOUNTS ===
bind /opt/aleph-scriptorium/ScriptoriumVps/node-red-projects -> /data/projects
bind /srv/oasis/scriptorium/ARCHIVO -> /data/ARCHIVO
bind /srv/oasis/scriptorium/ARCHIVO/DISCO -> /data/ARCHIVO/DISCO
bind /opt/aleph-scriptorium/ScriptoriumVps/PATTERN-DOCKER/nodered -> /opt/aleph/node-red-pattern

=== UID/GID inside container ===
uid=1000(node-red) gid=1000(node-red) groups=1000(node-red)

=== /data root listing (not subdirs) ===
total 500
drwxrwxr-x    1 node-red node-red      4096 May  9 14:04 .
drwxr-xr-x    1 root     root          4096 May  9 10:44 ..
-rw-r--r--    1 node-red node-red     36464 May  9 14:04 .config.nodes.json
-rw-r--r--    1 node-red node-red     14682 May  9 14:04 .config.nodes.json.backup
-rw-r--r--    1 node-red node-red        22 May  9 10:44 .config.projects.json
-rw-r--r--    1 node-red node-red        40 May  9 10:44 .config.runtime.json
drwxr-xr-x    1 node-red node-red      4096 May  9 14:02 .npm
drwxr-xr-x    4 node-red node-red      4096 May  9 10:43 ARCHIVO
-rw-r--r--    1 node-red node-red      3949 May  9 14:04 flows.json
-rw-r--r--    1 node-red node-red      1373 May  9 14:02 flows.json.pre-rooms-20260509T140227
drwxr-xr-x    3 node-red node-red      4096 May  9 10:44 lib
drwxr-xr-x  369 node-red node-red     12288 May  9 14:04 node_modules
-rw-r--r--    1 node-red node-red    383031 May  9 14:04 package-lock.json
-rw-r--r--    1 node-red node-red       300 May  9 14:04 package.json
-rw-r--r--    1 node-red node-red       120 May  9 14:02 package.json.pre-rooms-20260509T140227
drwxr-xr-x    3 node-red node-red      4096 May  9 14:01 projects
-rw-rw-r--    1 node-red node-red      2395 May  9 08:34 settings.js

=== /data disk usage ===
1.3G    /data/
977.7M  /data/node_modules

=== SCRIPTORIUM_REMOTE_ROOT on host ===
/opt/aleph-scriptorium/MCPGallery/mcp-model-sdk/.env
/opt/aleph-scriptorium/MCPGallery/mcp-channels-sdk/socket.io-admin-ui-develop/ui/.env
/opt/aleph-scriptorium/ScriptoriumVps/.env

=== Host free space ===
Filesystem      Size  Used Avail Use% Mounted on
/dev/xvda1       25G  8.6G   15G  37% /

aleph@DESKTOP-7443I02 MINGW64 ~/OASIS/alephscript-network-sdk (integration/beta/scriptorium)
```

Detalles e histórico: C:\Users\aleph\OASIS\alephscript-network-sdk\GANDI_DEVOPS_FOLDER\SERVER.md



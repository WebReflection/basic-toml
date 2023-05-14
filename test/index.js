const {parse} = require('../cjs');

if (!Object.is(
  JSON.stringify(
    parse(`
      # comment
      app = "YOUR_FLY_APP_NAME" # comment
      kill_signal = "SIGINT"
      kill_timeout = 5
      processes = []

      [env] # comment
        PORT = "8080"

      [experimental]
        auto_rollback = true
        enable_consul = true

      [mounts]
        source = "litefs"
        destination = "/var/lib/litefs"

      [[services]] # comment
        http_checks = []
        internal_port = 8080
        processes = ["app"]
        protocol = "tcp"
        script_checks = []
        [services.concurrency]
          hard_limit = 25
          soft_limit = 20
          type = "connections"
      
        [[services.ports]] # comment
          force_https = true
          handlers = ["http"] # comment
          port = 80

        [[services.ports]]
          handlers = ["tls", "http"]
          port = 443

        [[services.tcp_checks]]
          grace_period = "1s"
          interval = "15s"
          restart_limit = 0
          timeout = "2s"

      [[services]] # comment
        http_checks = []
        internal_port = 8080
        processes = ["app"]

        [[services.ports]]
          handlers = ["tls", "http"]
          port = 443
    `)
  ),
  JSON.stringify({
    "app": "YOUR_FLY_APP_NAME",
    "kill_signal": "SIGINT",
    "kill_timeout": 5,
    "processes": [],
    "env": {
      "PORT": "8080"
    },
    "experimental": {
      "auto_rollback": true,
      "enable_consul": true
    },
    "mounts": {
      "source": "litefs",
      "destination": "/var/lib/litefs"
    },
    "services": [
      {
        "http_checks": [],
        "internal_port": 8080,
        "processes": [
          "app"
        ],
        "protocol": "tcp",
        "script_checks": [],
        "concurrency": {
          "hard_limit": 25,
          "soft_limit": 20,
          "type": "connections"
        },
        "ports": [
          {
            "force_https": true,
            "handlers": [
              "http"
            ],
            "port": 80
          },
          {
            "handlers": [
              "tls",
              "http"
            ],
            "port": 443
          }
        ],
        "tcp_checks": [
          {
            "grace_period": "1s",
            "interval": "15s",
            "restart_limit": 0,
            "timeout": "2s"
          }
        ]
      },
      {
        "http_checks": [],
        "internal_port": 8080,
        "processes": [
          "app"
        ],
        "ports": [
          {
            "handlers": [
              "tls",
              "http",
            ],
            "port": 443
          },
        ]
      }
    ]
  })
)) throw new Error('shenanigans');

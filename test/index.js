const {parse} = require('../cjs');

const {stringify} = JSON;

const assert = (toml, json) => {
  if (stringify(parse(toml)) !== stringify(json)) {
    console.error('\x1b[1mexpected\x1b[0m', stringify(json, null, '  '));
    console.error('\x1b[1mgot\x1b[0m', stringify(parse(toml), null, '  '));
    throw new Error('invalid parser');
  }
};

assert(
  `
    # This is a TOML document.

    title = "TOML Example"

    [owner]
    name = "Tom Preston-Werner"
    dob = 1979-05-27T07:32:00-08:00 # First class dates

    [database]
    server = "192.168.1.1"
    ports = [ 8000, 8001, 8002 ]
    connection_max = 5000
    enabled = true

    [servers]

      # Indentation (tabs and/or spaces) is allowed but not required
      [servers.alpha]
      ip = "10.0.0.1"
      dc = "eqdc10"

      [servers.beta]
      ip = "10.0.0.2"
      dc = "eqdc10"

    [clients]
    data = [ ["gamma", "delta"], [1, 2] ]

    # Line breaks are OK when inside arrays
    hosts = [
      "alpha",
      "omega"
    ]
  `,
  {
    "title": "TOML Example",
    "owner": {
      "name": "Tom Preston-Werner",
      "dob": "1979-05-27T15:32:00.000Z"
    },
    "database": {
      "server": "192.168.1.1",
      "ports": [
        8000,
        8001,
        8002
      ],
      "connection_max": 5000,
      "enabled": true
    },
    "servers": {
      "alpha": {
        "ip": "10.0.0.1",
        "dc": "eqdc10"
      },
      "beta": {
        "ip": "10.0.0.2",
        "dc": "eqdc10"
      }
    },
    "clients": {
      "data": [
        [
          "gamma",
          "delta"
        ],
        [
          1,
          2
        ]
      ],
      "hosts": [
        "alpha",
        "omega"
      ]
    }
  }
);

assert(
  `
    # comment
    app = "YOUR_FLY_APP_NAME" # comment
    "kill_signal" = "SIGINT"
    kill_timeout = 5
    processes = []
    env = { PORT = "8080" }

    [experimental] # comment
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
      [services."concurrency"]
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
  `,
  {
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
  }
);

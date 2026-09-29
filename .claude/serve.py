"""Local preview server with caching disabled (development only)."""
import http.server
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 5510


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    http.server.ThreadingHTTPServer(("127.0.0.1", PORT), NoCacheHandler).serve_forever()

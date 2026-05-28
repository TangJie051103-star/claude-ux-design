import sys
import os
import time
import requests
from pathlib import Path

API_KEY = os.environ.get("ZHIPU_API_KEY", "")
API_BASE = "https://open.bigmodel.cn/api/paas/v4"
OUTPUT_DIR = Path(os.environ.get("ZHIPU_OUTPUT_DIR", "d:/claude专用/output/images"))


def generate(prompt: str, size: str = "1024x1024", model: str = "cogview-3-flash") -> str:
    if not API_KEY:
        raise RuntimeError("未设置 ZHIPU_API_KEY 环境变量")

    resp = requests.post(
        f"{API_BASE}/images/generations",
        headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
        json={"model": model, "prompt": prompt, "size": size},
        timeout=120,
    )

    if resp.status_code != 200:
        raise RuntimeError(f"API 调用失败 ({resp.status_code}): {resp.text}")

    return resp.json()["data"][0]["url"]


def download(url: str, prompt_hint: str) -> str:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    resp = requests.get(url, timeout=60)
    resp.raise_for_status()

    ts = int(time.time())
    stem = prompt_hint[:30].replace(" ", "_").replace("/", "_").replace("\\", "_")
    path = OUTPUT_DIR / f"{stem}_{ts}.png"
    path.write_bytes(resp.content)
    return str(path)


def main():
    if len(sys.argv) < 2:
        print("用法: python zhipu_image.py <提示词> [尺寸] [模型]")
        sys.exit(1)

    prompt = sys.argv[1]
    size = sys.argv[2] if len(sys.argv) > 2 else "1024x1024"
    model = sys.argv[3] if len(sys.argv) > 3 else "cogview-3-flash"

    print(f"生成中: {prompt}")
    url = generate(prompt, size, model)
    print(f"图片 URL: {url}")
    path = download(url, prompt)
    print(f"已保存: {path}")


if __name__ == "__main__":
    main()

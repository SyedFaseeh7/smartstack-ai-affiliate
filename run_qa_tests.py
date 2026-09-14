import urllib.request
import urllib.error
import json
import time
import subprocess
import sys
import os

BASE_URL = "http://localhost:3000"

def reset_db_baseline():
    db_file = os.path.join(os.getcwd(), "database", "data.json")
    if os.path.exists(db_file):
        os.remove(db_file)
        print("Reset data.json to clean baseline with 20 default products and 6 default articles.")

def is_server_running():
    try:
        req = urllib.request.Request(f"{BASE_URL}/api/analytics")
        with urllib.request.urlopen(req, timeout=3) as resp:
            return resp.status == 200
    except Exception:
        return False

def make_request(url, method="GET", body=None, headers=None):
    if headers is None:
        headers = {}
    
    data = None
    if body is not None:
        data = json.dumps(body).encode('utf-8')
        headers['Content-Type'] = 'application/json'
        
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            res_body = response.read().decode('utf-8')
            return {
                "status": response.status,
                "headers": dict(response.getheaders()),
                "body": res_body,
                "error": None
            }
    except urllib.error.HTTPError as e:
        res_body = e.read().decode('utf-8') if e.fp else ""
        return {
            "status": e.code,
            "headers": dict(e.headers) if e.headers else {},
            "body": res_body,
            "error": str(e)
        }
    except Exception as e:
        return {
            "status": 0,
            "headers": {},
            "body": "",
            "error": str(e)
        }

def run_qa_suite():
    results = {}
    
    # 1. REST API Endpoints
    print("--- 1. REST API Endpoints ---")
    
    # 1a. /api/analytics
    res = make_request(f"{BASE_URL}/api/analytics")
    if res["status"] == 200:
        try:
            data = json.loads(res["body"])
            tot_prod = data.get("totalProducts")
            tot_art = data.get("totalArticles")
            auto_mode = data.get("autonomousMode")
            
            passed = (tot_prod == 20 or tot_prod >= 20) and (tot_art >= 6) and (auto_mode is True)
            results["GET /api/analytics"] = {
                "pass": passed,
                "details": f"Status: {res['status']}, totalProducts: {tot_prod} (expected >=20), totalArticles: {tot_art} (expected >=6), autonomousMode: {auto_mode} (expected True)"
            }
        except Exception as e:
            results["GET /api/analytics"] = {"pass": False, "details": f"JSON decode error: {e}"}
    else:
        results["GET /api/analytics"] = {"pass": False, "details": f"HTTP {res['status']}: {res['error']}"}

    # 1b. /api/products
    res = make_request(f"{BASE_URL}/api/products")
    if res["status"] == 200:
        try:
            products = json.loads(res["body"])
            valid_items = 0
            if isinstance(products, list):
                for p in products:
                    if p.get("name") and p.get("price") and p.get("imageUrl", "").startswith("http"):
                        valid_items += 1
            passed = (len(products) >= 20) and (valid_items == len(products))
            results["GET /api/products"] = {
                "pass": passed,
                "details": f"Status: {res['status']}, Count: {len(products)} (expected >=20), Valid schema items: {valid_items}/{len(products)}"
            }
        except Exception as e:
            results["GET /api/products"] = {"pass": False, "details": f"JSON decode error: {e}"}
    else:
        results["GET /api/products"] = {"pass": False, "details": f"HTTP {res['status']}: {res['error']}"}

    # 1c. /api/articles
    res = make_request(f"{BASE_URL}/api/articles")
    if res["status"] == 200:
        try:
            articles = json.loads(res["body"])
            published_count = sum(1 for a in articles if a.get("status") == "published" and a.get("slug"))
            passed = len(articles) >= 6 and published_count == len(articles)
            results["GET /api/articles"] = {
                "pass": passed,
                "details": f"Status: {res['status']}, Count: {len(articles)} (expected >=6), Clean published count: {published_count}/{len(articles)}"
            }
        except Exception as e:
            results["GET /api/articles"] = {"pass": False, "details": f"JSON decode error: {e}"}
    else:
        results["GET /api/articles"] = {"pass": False, "details": f"HTTP {res['status']}: {res['error']}"}

    # 2. Public Page Navigation
    print("--- 2. Public Page Navigation ---")
    
    # 2a. / (Homepage)
    res = make_request(f"{BASE_URL}/")
    passed = (res["status"] == 200) and ("<!DOCTYPE html>" in res["body"] or "SmartStack" in res["body"] or "<html" in res["body"])
    results["GET / (Homepage)"] = {
        "pass": passed,
        "details": f"Status: {res['status']}, HTML Rendered: {passed}"
    }

    # 2b. /about (About Us)
    res = make_request(f"{BASE_URL}/about")
    passed = (res["status"] == 200) and ("About" in res["body"] or "<html" in res["body"])
    results["GET /about (About Us Page)"] = {
        "pass": passed,
        "details": f"Status: {res['status']}, HTML Rendered: {passed}"
    }

    # 2c. /article/top-5-ai-tools-automate-business-2026
    res = make_request(f"{BASE_URL}/article/top-5-ai-tools-automate-business-2026")
    passed = (res["status"] == 200) and ("article" in res["body"].lower() or "<html" in res["body"])
    results["GET /article/top-5-ai-tools-automate-business-2026"] = {
        "pass": passed,
        "details": f"Status: {res['status']}, HTML Rendered: {passed}"
    }

    # 3. Security & Admin Route Isolation
    print("--- 3. Security & Admin Route Isolation ---")
    
    # 3a. /smartstack-control-panel-x99
    res = make_request(f"{BASE_URL}/smartstack-control-panel-x99")
    passed = (res["status"] == 200) and ("Control Panel" in res["body"] or "Admin" in res["body"] or "<html" in res["body"])
    results["GET /smartstack-control-panel-x99 (Control Panel)"] = {
        "pass": passed,
        "details": f"Status: {res['status']} (Expected 200 OK), HTML Rendered: {passed}"
    }

    # 3b. /admin
    res = make_request(f"{BASE_URL}/admin")
    passed = (res["status"] == 404)
    results["GET /admin (Obscured Route isolation)"] = {
        "pass": passed,
        "details": f"Status: {res['status']} (Expected 404 Not Found)"
    }

    # 4. Feeds
    print("--- 4. Feeds ---")
    
    # 4a. /sitemap.xml
    res = make_request(f"{BASE_URL}/sitemap.xml")
    passed = (res["status"] == 200) and ("<urlset" in res["body"]) and ("</urlset>" in res["body"])
    results["GET /sitemap.xml (Sitemap)"] = {
        "pass": passed,
        "details": f"Status: {res['status']}, XML urlset valid: {passed}"
    }

    # 4b. /feed.xml
    res = make_request(f"{BASE_URL}/feed.xml")
    passed = (res["status"] == 200) and ("<rss" in res["body"]) and ("</rss>" in res["body"])
    results["GET /feed.xml (RSS Feed)"] = {
        "pass": passed,
        "details": f"Status: {res['status']}, RSS channel valid: {passed}"
    }

    # 5. Automation Trigger Test
    print("--- 5. Automation Trigger Test ---")
    
    # Get initial product count
    res_before = make_request(f"{BASE_URL}/api/analytics")
    count_before = json.loads(res_before["body"]).get("totalProducts", 0) if res_before["status"] == 200 else 0
    
    res_trig = make_request(f"{BASE_URL}/api/automation/trigger", method="POST")
    if res_trig["status"] == 200:
        try:
            trig_data = json.loads(res_trig["body"])
            success = trig_data.get("success")
            new_analytics = trig_data.get("analytics", {})
            count_after = new_analytics.get("totalProducts", 0)
            
            passed = (success is True) and (count_after >= count_before + 1)
            results["POST /api/automation/trigger"] = {
                "pass": passed,
                "details": f"Status: {res_trig['status']}, success: {success}, Products before: {count_before}, Products after: {count_after}"
            }
        except Exception as e:
            results["POST /api/automation/trigger"] = {"pass": False, "details": f"JSON decode error: {e}"}
    else:
        results["POST /api/automation/trigger"] = {"pass": False, "details": f"HTTP {res_trig['status']}: {res_trig['error']}"}

    print("\n================ FINAL RESULTS JSON ================")
    print(json.dumps(results, indent=2))
    return results

if __name__ == "__main__":
    reset_db_baseline()
    server_process = None
    if not is_server_running():
        print("Server not running. Starting node server.js...")
        server_process = subprocess.Popen(["node", "server.js"], cwd=os.getcwd())
        time.sleep(3)
        if not is_server_running():
            print("Failed to start server. Exiting.")
            sys.exit(1)
        print("Server started successfully.")
    else:
        print("Server is already running.")

    try:
        run_qa_suite()
    finally:
        if server_process:
            print("Shutting down background node server process...")
            server_process.terminate()
            server_process.wait()

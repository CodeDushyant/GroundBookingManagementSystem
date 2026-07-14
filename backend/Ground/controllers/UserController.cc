#include "UserController.h"
#include <drogon/drogon.h>

using namespace drogon;

void UserController::asyncHandleHttpRequest(
    const HttpRequestPtr &req,
    std::function<void(const HttpResponsePtr &)> &&callback)
{
    Json::Value json;

    try
    {
        auto db = app().getDbClient();

        auto result = db->execSqlSync("SELECT sqlite_version();");

        json["success"] = true;
        json["message"] = "SQLite Connected Successfully";
        json["sqlite_version"] = result[0][0].as<std::string>();
    }
    catch (const drogon::orm::DrogonDbException &e)
    {
        json["success"] = false;
        json["error"] = e.base().what();
    }

    auto resp = HttpResponse::newHttpJsonResponse(json);
    callback(resp);
}
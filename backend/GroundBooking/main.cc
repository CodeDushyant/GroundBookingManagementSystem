#include <drogon/drogon.h>
#include <iostream>

using namespace drogon;

int main()
{
    std::cout << "Program Started" << std::endl;

    app().loadConfigFile("./config.json");

    std::cout << "Config Loaded" << std::endl;

    app().registerHandler(
        "/",
        [](const HttpRequestPtr &req,
           std::function<void(const HttpResponsePtr &)> &&callback)
        {
            auto resp = HttpResponse::newHttpResponse();
            resp->setBody("Hello Drogon");
            callback(resp);
        }
    );

    std::cout << "Starting Server..." << std::endl;

    app().run();

    std::cout << "Server Closed" << std::endl;

    return 0;
}
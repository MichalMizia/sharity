#include <iostream>
#include <fstream>
#include <thread>
#include <vector>
#include <chrono>
#include "monitor.h"

#define MAGAZYN_FILE "magazyn.txt"

class Magazine : public Monitor {
private:
    int capacity;
    int content;
    Condition full, empty;

    void writeToFile(int value) {
        std::ofstream file(MAGAZYN_FILE, std::ios::trunc);
        if (file.is_open()) {
            file << value;
            file.close();
        }
    }

    int readFromFile() {
        std::ifstream file(MAGAZYN_FILE);
        int value = 0;
        if (file.is_open()) {
            file >> value;
            file.close();
        }
        return value;
    }

    void log(const std::string& filename, const std::string& message) {
        std::ofstream logFile(filename, std::ios::app);
        if (logFile.is_open()) {
            logFile << message << std::endl;
            logFile.close();
        }
    }

public:
    Magazine(int maxCapacity) : capacity(maxCapacity), content(0) {
        writeToFile(content);
    }

    void produce(int amount, int id) {
        enter();
        std::string logFilename = "logs/producer" + std::to_string(id) + ".log";
        log(logFilename, "Trying to produce: " + std::to_string(amount));

        while (content + amount > capacity) {
            wait(full);
        }
        content += amount;
        writeToFile(content);
        std::cout << "Produced " << amount << " items. Current stock: " << content << std::endl;
        log(logFilename, "Produced: " + std::to_string(amount));
        signal(empty); // budzenie konsumentow
        leave();
    }

    void consume(int amount, int id) {
        enter();
        std::string logFilename = "logs/consumer" + std::to_string(id) + ".log";
        log(logFilename, "Trying to consume: " + std::to_string(amount));

        while (content < amount) {
            wait(empty);
        }
        content -= amount;
        writeToFile(content);
        std::cout << "Consumed " << amount << " items. Current stock: " << content << std::endl;
        log(logFilename, "Consumed: " + std::to_string(amount));
        signal(full); // budzenie producentow
        leave();
    }
};

void producent(int id, int a, int b, Magazine& magazine) {
    srand(time(NULL) + id);

    while (true) {
        int ile = rand() % (b - a + 1) + a;
        std::cout << "Producer " << id << " wants to produce: " << ile << " items." << std::endl;
        magazine.produce(ile, id);
        sleep(1);
    }
}

void konsument(int id, int c, int d, Magazine& magazine) {
    srand(time(NULL) + id);

    while (true) {
        int ile = rand() % (d - c + 1) + c;
        std::cout << "Consumer " << id << " wants to consume: " << ile << " items." << std::endl;
        magazine.consume(ile, id);
        sleep(1);
    }
}

int main(int argc, char* argv[]) {
    if (argc != 8) {
        std::cerr << "Usage: " << argv[0] << " <number_of_producers> <number_of_consumers> <a> <b> <c> <d> <magazine_capacity>\n";
        return 1;
    }

    int producersCount = std::stoi(argv[1]);
    int consumersCount = std::stoi(argv[2]);
    int a = std::stoi(argv[3]);
    int b = std::stoi(argv[4]);
    int c = std::stoi(argv[5]);
    int d = std::stoi(argv[6]);
    int magazineCapacity = std::stoi(argv[7]);

    Magazine magazine(magazineCapacity);

    std::vector<std::thread> producers;
    std::vector<std::thread> consumers;

    for (int i = 0; i < producersCount; ++i) {
        producers.emplace_back(producent, i + 1, a, b, std::ref(magazine));
    }
    for (int i = 0; i < consumersCount; ++i) {
        consumers.emplace_back(konsument, i + 1, c, d, std::ref(magazine));
    }

    for (auto& thread : producers) {
        thread.join();
    }
    for (auto& thread : consumers) {
        thread.join();
    }

    return 0;
}

#include <bits/stdc++.h>
using namespace std;

int digit_sum(int n) {
    int sum = 0;
    while (n > 0) {
        sum += n % 10;
        n /= 10;
    }
    return sum;
}

int count_gcd(int L, int X, int Y) {
    set<pair<int, int>> unique_pairs;

    for (int a = 1; a <= L; ++a) {
        for (int b = a + 1; b <= L; ++b) {
            if (__gcd(a, b) == X && (digit_sum(a) + digit_sum(b)) == Y) {
                unique_pairs.insert({a, b});
            }
        }
    }
    
    return unique_pairs.size();
}

int main() {
    int T;
    cin >> T;
    
    while (T--) {
        int L, X, Y;
        cin >> L >> X >> Y;
        cout << count_gcd(L, X, Y) << endl;
    }

    return 0;
}
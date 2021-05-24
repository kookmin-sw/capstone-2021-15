python3 our_gru.py --k=20 --units=100 --loss=categorical_crossentropy > results/categorical_100_20.txt
sleep 3

python3 our_gru.py --k=20 --units=100 --loss=binary_categorical_crossentropy > results/binary_categorical_100_20.txt
sleep 3

python3 our_gru.py --k=20 --units=100 --loss=sparse_categorical_crossentropy --eval-only=True > results/sparse_100_20.txt
sleep 3


python3 our_gru.py --k=20 --units=1000 --loss=categorical_crossentropy > results/categorcial_1000_20.txt
sleep 3

python3 our_gru.py --k=20 --units=1000 --loss=binary_categorical_crossentropy > results/binary_categorical_1000_20.txt
sleep 3

python3 our_gru.py --k=20 --units=1000 --loss=sparse_categorical_crossentropy --eval-only=True > results/sparse_1000_20.txt
sleep 3



python3 our_gru.py --k=10 --units=100 --loss=categorical_crossentropy > results/categorical_100_10.txt
sleep 3

python3 our_gru.py --k=10 --units=100 --loss=binary_categorical_crossentropy > results/binary_categorical_100_10.txt
sleep 3

python3 our_gru.py --k=10 --units=100 --loss=sparse_categorical_crossentropy --eval-only=True > results/sparse_100_10.txt
sleep 3


python3 our_gru.py --k=10 --units=1000 --loss=categorical_crossentropy > results/categorical_1000_10.txt
sleep 3

python3 our_gru.py --k=10 --units=1000 --loss=binary_categorical_crossentropy > results/binary_categorical_1000_10.txt
sleep 3

python3 our_gru.py --k=10 --units=1000 --loss=sparse_categorical_crossentropy --eval-only=True > results/sparse_1000_10.txt
sleep 3

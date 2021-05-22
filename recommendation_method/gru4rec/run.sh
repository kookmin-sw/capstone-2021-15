python3 our_gru.py --k=20 --units=100 --loss=categorical_crossentropy
sleep 3

python3 our_gru.py --k=20 --units=100 --loss=binary_crossentropy
sleep 3

python3 our_gru.py --k=20 --units=100 --loss=sparse_categorical_crossentropy
sleep 3

python3 our_gru.py --k=10 --units=100 --loss=categorical_crossentropy
sleep 3

python3 our_gru.py --k=10 --units=100 --loss=binary_crossentropy
sleep 3

python3 our_gru.py --k=10 --units=100 --loss=sparse_categorical_crossentropy
sleep 3


python3 our_gru.py --k=20 --units=1000 --loss=categorical_crossentropy
sleep 3

python3 our_gru.py --k=20 --units=1000 --loss=binary_crossentropy
sleep 3

python3 our_gru.py --k=20 --units=1000 --loss=sparse_categorical_crossentropy
sleep 3

python3 our_gru.py --k=10 --units=1000 --loss=categorical_crossentropy
sleep 3

python3 our_gru.py --k=10 --units=1000 --loss=binary_crossentropy
sleep 3

python3 our_gru.py --k=10 --units=1000 --loss=sparse_categorical_crossentropy
sleep 3
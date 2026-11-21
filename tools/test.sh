#!/bin/zsh
# Comprueba la web: sintaxis de todos los JS + un robot que juega todas las jornadas de todas las unidades.
# Uso: tools/test.sh
cd "$(dirname "$0")/.."
fail=0
for f in js/*.js subjects/**/*.js; do node --check "$f" || { echo "❌ Sintaxis: $f"; fail=1; }; done

# El robot carga las mismas unidades que index.html
tmp=tools/.robot-run.html
awk '
  FNR==NR { if ($0 ~ /<script src="subjects\/[^"]+\/[^"]+\.js"><\/script>/) { gsub(/src="/, "src=\"../"); units = units $0 "\n" } next }
  /<!-- UNITS -->/ { printf "%s", units; next }
  { print }
' index.html tools/robot.html > $tmp

log=$("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --allow-file-access-from-files --virtual-time-budget=180000 --dump-dom "file://$PWD/$tmp" 2>/dev/null \
  | awk '/<pre id="log">/{p=1} p{print} /<\/pre>/{p=0}' | sed -e 's/<[^>]*>//g' -e 's/&gt;/>/g' -e 's/&lt;/</g' -e 's/&amp;/\&/g')
rm -f $tmp
echo "$log"
[ -z "$log" ] && { echo "❌ El robot no ha devuelto nada"; fail=1; }
echo "$log" | grep -q 'ERR ' && fail=1
[ $fail = 0 ] && echo "✅ Todo OK" || { echo "❌ Hay errores"; exit 1; }

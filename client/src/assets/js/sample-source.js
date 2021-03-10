const c_sample =
  '#include <stdio.h>\n' + 'int main() {\n' + '    printf("Hello World!");\n' + '}\n';

const cpp_sample =
  '#include <iostream>\n' +
  'using namespace std;\n' +
  'int main() {\n' +
  '    cout<<"Hello World!";\n' +
  '}\n';

const langSamples = {
  c: c_sample,
  cpp: cpp_sample,
};

export default langSamples;

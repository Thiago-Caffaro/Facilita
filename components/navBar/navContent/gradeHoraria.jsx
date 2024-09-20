import { Text, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import gradeHorariaStyles from '@/styles/gradeHorariaStyles';
import useGetGrade from '@/hooks/getGradeHoraria';
import Carregamento from '@/components/carregamento/carregamento';

function GradeHoraria() {
    const [grade, setGrade] = useState(null);
    const tempos = [
        "07:50 - 08:40",
        "08:50 - 10:30",
        "10:30 - 12:10",
        "12:50 - 14:30",
        "14:30 - 16:10",
        "16:20 - 18:10"
    ];
    const getGrade = useGetGrade();

    useEffect(() => {
        async function fetchData() {
            const data = await getGrade();
            setGrade(data?.gradeHoraria);
        }
        fetchData();
    }, []);

    if (!grade) {
        return <Carregamento />;
    }

    const diasDaSemana = ["Segunda", "Terca", "Quarta", "Quinta", "Sexta", "Sabado"];
    const temposMapeados = ["primeiroTempo", "segundoTempo", "terceiroTempo", "quartoTempo", "quintoTempo", "sextoTempo"];
    const professoresMapeados = ["primeiroProfessor", "segundoProfessor", "terceiroProfessor", "quartoProfessor", "quintoProfessor", "sextoProfessor"];

    return (
        <ScrollView contentContainerStyle={gradeHorariaStyles.scrollContainer}>
            <View id="content" style={gradeHorariaStyles.content}>
                {diasDaSemana.map((dia, index) => (
                    <View key={index}>
                        {dia === "Sabado" ? <Text style={gradeHorariaStyles.title}>{dia}</Text> : <Text style={gradeHorariaStyles.title}>{dia}-Feira</Text> }
                        <View style={gradeHorariaStyles.horarios}>
                            {tempos.map((tempo, tempoIndex) => {
                                if (dia == "Sabado" && tempo == "14:30 - 16:10" || dia == "Sabado" && tempo == "16:20 - 18:10"){
                                    return null
                                }// Caso o tempo for esses de cima no sábado, ele não mostra
                                else return (
                                    <View key={tempoIndex} style={gradeHorariaStyles.tempoRow}>
                                        <Text style={gradeHorariaStyles.tempos}>{tempo}</Text>
                                        <View style={gradeHorariaStyles.box}>
                                            {/* Exibe a matéria e o professor de acordo com o tempo */}
                                            <Text style={gradeHorariaStyles.materias}>
                                                {grade[dia]?.[temposMapeados[tempoIndex]] || "VAGO"}
                                            </Text>
                                            <Text style={gradeHorariaStyles.professor}>
                                                {grade[dia]?.[professoresMapeados[tempoIndex]] || "VAGO"}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            }
                                
                            )}
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

export default GradeHoraria;
